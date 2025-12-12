import { IsNotEmpty, IsUUID, IsEnum, IsNumber, IsInt, Min, Max, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaymentMethod } from "../entities/order.entity";

export class CreatePaymentDto {

    @ApiProperty({ description: "Método de pagamento", enum: PaymentMethod, example: PaymentMethod.CREDIT_CARD })
    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    methodPayment: PaymentMethod;

    @ApiPropertyOptional({ description: "Token do cartão (obrigatório se methodPayment = CREDIT_CARD)", example: "tok_93hd9sj932...w8d82h" })
    @ValidateIf(o => o.methodPayment === PaymentMethod.CREDIT_CARD)
    @IsNotEmpty({ message: "creditCardToken é obrigatório quando o pagamento é por cartão de crédito." })
    creditCardToken?: string;

    @ApiProperty({ description: "Número de parcelas (entre 1 e 12)", example: 3 })
    @IsInt()
    @Min(1)
    @Max(12)
    @IsNotEmpty()
    numberOfInstallments: number;

    @ApiProperty({ description: "Endereço de entrega do pedido", example: "a34bb8e1-e5cc-40bc-8ab8-97cfef9e6a63" })
    @IsUUID()
    @IsNotEmpty()
    addressId: string;

    @ApiProperty({ description: "Usuário que fez o pedido", example: "23a84d9f-b0e7-4a00-9437-aa2f10f0a3f1" })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
