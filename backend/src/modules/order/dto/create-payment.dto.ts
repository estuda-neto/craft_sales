import { IsDateString, IsNotEmpty, IsUUID, IsEnum, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus, PaymentMethod } from "../entities/order.entity";

export class CreatePaymentDto {

    @ApiProperty({ description: "Status do pedido", enum: OrderStatus, example: OrderStatus.PAID })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({ description: "Método de pagamento", enum: PaymentMethod, example: PaymentMethod.CREDIT_CARD })
    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    methodPayment: PaymentMethod;

    @ApiProperty({ description: "Valor pago", example: 120.50 })
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @ApiProperty({ description: 'Data do pagamento (YYYY-MM-DD)', example: '2026-08-21' })
    @IsDateString({}, { message: 'A data deve estar no formato YYYY-MM-DD' })
    @IsNotEmpty()
    datePayment: Date;

    @ApiProperty({ description: "Endereço usado no pedido", example: "a34bb8e1-e5cc-40bc-8ab8-97cfef9e6a63" })
    @IsUUID()
    @IsNotEmpty()
    addressId: string;

    @ApiProperty({ description: "Usuário que fez o pedido", example: "23a84d9f-b0e7-4a00-9437-aa2f10f0a3f1" })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
