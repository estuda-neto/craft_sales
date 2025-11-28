import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { OrderStatus, PaymentMethod } from "../entities/order.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({ description: "Nome do pedido (ex: nome do cliente ou identificação)", example: "Pedido João Silva" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: "Status do pedido", enum: OrderStatus, example: OrderStatus.PENDING_PAYMENT, default: OrderStatus.PENDING_PAYMENT })
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @ApiProperty({ description: "Forma de pagamento", enum: PaymentMethod, example: PaymentMethod.PIX })
    @IsEnum(PaymentMethod)
    methodPayment: PaymentMethod;

    @ApiProperty({ description: "Valor total do pedido", example: 199.90 })
    @IsNumber()
    @IsPositive()
    value: number;

    @ApiProperty({ description: "Código de confirmação do pedido / pagamento", example: "ABC123XYZ" })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiPropertyOptional({ description: "Data do pagamento", example: "2025-11-20T15:30:00.000Z" })
    @IsOptional()
    @IsDateString()
    datePayment?: Date;

    @ApiPropertyOptional({ description: "Data que o pedido foi enviado", example: "2025-11-21T10:00:00.000Z" })
    @IsOptional()
    @IsDateString()
    dateSent?: Date;

    @ApiProperty({ description: "Endereço de entrega (UUID)", example: "4b160f1e-3f79-4d43-8b82-ea9de87e67a2" })
    @IsUUID()
    addressId: string;

    @ApiProperty({ description: "Usuário que fez o pedido (UUID)", example: "23a84d9f-b0e7-4a00-9437-aa2f10f0a3f1" })
    @IsUUID()
    usersId: string;
}
