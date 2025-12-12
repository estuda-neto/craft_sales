import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repository/order.repository';
import { EfiService } from './efi.service';
import { AddressInfo, BoletoChargePayload, BoletoPaymentResponse, CustomerInfo, PixChargePayload } from './utils/interfaces.efi';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserService } from '../user/user.service';
import { AddressService } from '../address/address.service';

@Injectable()
export class OrderService extends BaseService<Order, CreateOrderDto, UpdateOrderDto> {

  constructor(private readonly orderRepository: OrderRepository,
    private readonly efiPaymentService: EfiService,
    private readonly userService: UserService,
    private readonly addressService: AddressService
  ) {
    super(orderRepository);
  }

  async create(createDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.criar(createDto as InferCreationAttributes<Order>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Order[]; count: number }> {
    const result = await this.orderRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }

  private async calculateAmountToBePaid(orderId: string): Promise<number> {
    const order = await this.orderRepository.findByIdWithItems(orderId);
    if (!order) throw new ApiError("This order does not exist", 404);

    if (!order.items || order.items.length === 0) {
      return 0;
    }
    const total = order.items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantProduct) || 0;
      return acc + price * qty;
    }, 0);

    return Number(total.toFixed(2));
  }

  //TODO:  status pode ser 
  /**
    PENDING_PAYMENT = "PENDING_PAYMENT",                   // ainda nao foi pago
    DESIRING_PAYMENT = "DESIRING_PAYMENT",                 // desejando pagar
    INPHASE_PAYMENT =  "INPHASE_PAYMENT",                  // em fase de pagamento
    PAID = "PAID",                                         // pago
    PROCESSING = "PROCESSING",                             // parcelado
    DESIRING_REIMBURSEMENT = "DESIRING_REIMBURSEMENT",     // desejando reembolso
    PENDING_REIMBURSEMENT = "PENDING_REIMBURSEMENT",       // desejando reembolsado
    REIMBURSEMENT = "REIMBURSEMENT",                       // reembolsado
    CANCELED = "CANCELED"                                  // cancelado

    metodo de pagamento 
    PIX = "PIX",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    BOLETO = "BOLETO",
    CASH = "CASH"
  */

  /**  methodPayment: PaymentMethod;  value: number; addressId: string; userId: string;  */
  async paymentOrder(orderId: string, dto: CreatePaymentDto): Promise<Order> {
    const order = await this.orderRepository.findByIdWithItems(orderId);
    if (!order) throw new ApiError("this order not exists", 404);

    const user = await this.userService.findOne(order.userId);
    const addressOfUser = await this.addressService.findOne(user.userId);

    const orderUpdate = await this.orderRepository.getInstanceById(orderId);
    if (!orderUpdate) throw new ApiError("this order not exists", 404);

    // Generate data global
    const valuePaid = await this.calculateAmountToBePaid(orderId);

    const items = order.items?.map(item => ({ name: user.name || "", value: Number(item.price) || 0, amount: Number(item.quantProduct) || 0 })) || [];
    const customer: CustomerInfo = { name: user.name, cpf: user.cpf, phone_number: user.phone, email: user.email, birth: "" };
    /** street: string; numerHouse: string; neighborhood: string; CEP: string; city: string; state: string; */
    const address: AddressInfo = {
      street: addressOfUser.streetAndHouseNumber, numerHouse: '1',
      neighborhood: addressOfUser.neighborhood, CEP: addressOfUser.CEP, city: addressOfUser.city, state: addressOfUser.state,
    };

    switch (order.status) {
      case OrderStatus.DESIRING_PAYMENT:
        if (dto.methodPayment === "PIX") {
          const pixKey = await this.efiPaymentService.createRandomPixKey();
          const pixchangeDto: PixChargePayload = { pixKey, value: valuePaid, name: user.name, cpf: user.cpf, description: `Cobrança referente aos produtos...` };

          const charge = await this.efiPaymentService.createImmediateChargePix(pixchangeDto);
          const qrCode = await this.efiPaymentService.generatePixQrCode(charge.locId);

          orderUpdate.qrCode = qrCode.qrcode;
          orderUpdate.imageQrCode = qrCode.imagemQrcode;
          orderUpdate.status = OrderStatus.INPHASE_PAYMENT;
          await orderUpdate.save();
          return order;
        }

        else if (dto.methodPayment === "CREDIT_CARD") {

          const charge = await this.efiPaymentService.createCreditCardCharge(items, customer);
          const payment = await this.efiPaymentService.payWithCreditCard(charge.chargeId, dto.creditCardToken ?? "", customer, address, dto.numberOfInstallments);
          orderUpdate.status = OrderStatus.INPHASE_PAYMENT;
          await orderUpdate.save();
          return order;
        }

        else {
          //interface BoletoChargePayload {items: ChargeItem[];customer: CustomerInfo;expireAt: string; // formato: "YYYY-MM-DD"}
          const boeltoPayment = await this.efiPaymentService.createBoletoPaymentLink({ items, customer, expired_at: "YYYY-MM-DD" } as unknown as BoletoChargePayload);
          orderUpdate.status = OrderStatus.INPHASE_PAYMENT;
          await orderUpdate.save();
          return order;
        }

      case OrderStatus.PENDING_PAYMENT:
        //faz algo
        break;

    }

    return order;
  }

  async corfirmOrder() { }

  // public async update(id: number, data: Partial<Pagamento>): Promise<[number]> {
  //   const pagamentoExistente = await this.pagamentoRepository.getById(id);
  //   if (!pagamentoExistente) throw new ApiError("Pagamento não encontrado", 404);

  //   if (data.pedidoId) {
  //     const pedido = await this.pedidosServices.getById(data.pedidoId);
  //     if (!pedido) throw new ApiError("Pedido não encontrado");
  //   }

  //   const [updatedCount] = await this.pagamentoRepository.update(id, data);
  //   return [updatedCount];
  // }

  // public async delete(id: number): Promise<void> {
  //   const pagamento = await this.pagamentoRepository.getById(id);
  //   if (!pagamento) throw new ApiError("Pagamento não encontrado", 404);
  //   await this.pagamentoRepository.delete(id);
  // }

  // public async findByPedidoId(pedidoId: number): Promise<Pagamento[]> {
  //   return await this.pagamentoRepository.findByPedidoId(pedidoId);
  // }

  // public async findByStatus(status: string): Promise<Pagamento[]> {
  //   return await this.pagamentoRepository.findByStatus(status);
  // }

  // public async findByDateRange(startDate: Date, endDate: Date): Promise<Pagamento[]> {
  //   return await this.pagamentoRepository.findByDateRange(
  //     startDate,
  //     endDate
  //   );
  // }

  // public async findByPaymentMethod(paymentMethod: string): Promise<Pagamento[]> {
  //   return await this.pagamentoRepository.findByPaymentMethod(
  //     paymentMethod
  //   );
  // }

  // public async findByTransactionId(transactionId: number): Promise<Pagamento> {
  //   const pagamento = await this.pagamentoRepository.findByTransactionId(
  //     transactionId
  //   );
  //   if (!pagamento) {
  //     throw new ApiError("Pagamento não encontrado com este ID de transação");
  //   }
  //   return pagamento;
  // }

  // public async realizarPagamento(dadosPagamento: RealizarPagamentoDtoType): Promise<Pagamento | PagamentoPixDtoType | BoletoPaymentResponse> {
  //   const pedido = await this.pedidosServices.getById(dadosPagamento.pedidoId);
  //   if (!pedido) throw new ApiError("Pedido não encontrado", 404);

  //   const listaProdutos: ChargeItem[] = [];

  //   await Promise.all(
  //     pedido.pedidoProdutos?.map(async (variacaoId, index) => {
  //       const prdutovariacao: ProdutoVariacao = await this.produtosVariacoesServices.getById(variacaoId);
  //       const produto: Produto = await this.produtosServices.getById(prdutovariacao.produtoId);

  //       if (prdutovariacao && produto) {
  //         listaProdutos.push({ name: produto.nome, value: prdutovariacao.preco, amount: pedido.pedidoProdutosQuantidades ? pedido.pedidoProdutosQuantidades[index] : 0 } as ChargeItem);
  //       }
  //     }) || []
  //   );
  //   const valorTotal = listaProdutos.reduce((acc, item) => {
  //     return acc + item.value * item.amount;
  //   }, 0);

  //   switch (dadosPagamento.metodo) {
  //     case "pix": {
  //       const chavePix: string = await this.efiPaymentService.createRandomPixKey();
  //       const cobrancaId = await this.efiPaymentService.createImmediateChargePix({ chavePix: chavePix, valor: dadosPagamento.valor, nome: dadosPagamento.nome, cpf: dadosPagamento.cpf, descricao: dadosPagamento.descricao } as PixChargePayload);
  //       const locId = cobrancaId.loc?.id;
  //       if (!locId) throw new ApiError("Erro ao criar cobrança PIX", 400);
  //       const qrcode = await this.efiPaymentService.generatePixQrCode(locId);
  //       if (!qrcode) throw new ApiError("Erro ao gerar QRCode", 400);
  //       const imagemQrcode = qrcode.imagemQrcode;
  //       const qrcodeUrl = qrcode.qrcode;

  //       const pagamento = new Pagamento({ pedidoId: dadosPagamento.pedidoId, valorPago: dadosPagamento.valor, statusPagamento: "pendente", metodoPagamento: "pix", dataPagamento: new Date(), usuarioId: pedido.usuarioId, createdAt: new Date(), updatedAt: new Date() });
  //       await this.pagamentoRepository.create(pagamento);
  //       return { imagemQrcode, qrcodeUrl } as PagamentoPixDtoType;
  //     }
  //     case "boleto": {
  //       const payload: BoletoChargePayload = {
  //         items: listaProdutos,
  //         customer: { name: dadosPagamento.nome, cpf: dadosPagamento.cpf, phone_number: dadosPagamento.telefone || "", email: dadosPagamento.email, birth: dadosPagamento.birth },
  //         expireAt: pedido.dataEntrega.toISOString().split("T")[0] || "", // Formato YYYY-MM-DD
  //       };
  //       const chargeBoleto = await this.efiPaymentService.createBoletoPaymentLink(payload);

  //       const pagamentoBoleto = new Pagamento({ pedidoId: dadosPagamento.pedidoId, valorPago: valorTotal, statusPagamento: "pendente", metodoPagamento: "boleto", dataPagamento: new Date(), usuarioId: pedido.usuarioId, createdAt: new Date(), updatedAt: new Date() });

  //       await this.pagamentoRepository.create(pagamentoBoleto);

  //       const boletoId = chargeBoleto.charge_id;
  //       const boletoLink = chargeBoleto.data?.link || "";
  //       const boletoBarcode = chargeBoleto.data?.codigo_barras || "";

  //       const boletoPaymentResponse: BoletoPaymentResponse = {
  //         charge_id: boletoId,
  //         status: chargeBoleto.status,
  //         total: chargeBoleto.total,
  //         link: boletoLink,
  //         payment: {
  //           banking_billet: {
  //             expire_at: chargeBoleto.payment.banking_billet.expire_at,
  //             barcode: boletoBarcode,
  //             link: boletoLink,
  //             pdf: chargeBoleto.payment.banking_billet.pdf,
  //           },
  //         },
  //       };
  //       return boletoPaymentResponse;
  //     }
  //     case "cartao": {
  //       const devedor: CustomerInfo = { name: dadosPagamento.nome, cpf: dadosPagamento.cpf, phone_number: dadosPagamento.telefone || "", email: dadosPagamento.email, birth: dadosPagamento.birth };
  //       const endereco: AddressInfo = { rua: dadosPagamento.endereco.rua, numero: dadosPagamento.endereco.numero, bairro: dadosPagamento.endereco.bairro, cep: dadosPagamento.endereco.cep, cidade: dadosPagamento.endereco.cidade, estado: dadosPagamento.endereco.estado };

  //       // 1º cria a cobrança
  //       const charge = await this.efiPaymentService.createCreditCardCharge(listaProdutos, devedor);

  //       // 2º realiza o pagamento com o token
  //       const dataCard = await this.efiPaymentService.payWithCreditCard(charge.charge_id,
  //         dadosPagamento.payment_token ?? "",
  //         devedor,
  //         endereco,
  //         dadosPagamento.numeroParcelas || 1
  //       );

  //       const pagamentoCartao = new Pagamento({ pedidoId: dadosPagamento.pedidoId, valorPago: dataCard.data.total, statusPagamento: "pendente", metodoPagamento: "cartao", dataPagamento: new Date(), usuarioId: pedido.usuarioId, createdAt: new Date(), updatedAt: new Date() });
  //       await this.pagamentoRepository.create(pagamentoCartao);
  //       return pagamentoCartao;
  //     }
  //     default:
  //       throw new ApiError("Método de pagamento inválido.", 404);
  //   }
  // }
}
