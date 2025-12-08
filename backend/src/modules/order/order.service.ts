import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repository/order.repository';
import { EfiService } from './efi.service';
import { AddressInfo, BoletoChargePayload, BoletoPaymentResponse, CustomerInfo } from './utils/interfaces.efi';

@Injectable()
export class OrderService extends BaseService<Order, CreateOrderDto, UpdateOrderDto> {
  constructor(private readonly orderRepository: OrderRepository, private readonly efiPaymentService: EfiService) {
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
  //TODO: 
  async paymentOrder(){}

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
