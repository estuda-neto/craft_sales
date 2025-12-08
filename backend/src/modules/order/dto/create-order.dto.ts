import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({ description: "Nome do pedido (ex: nome do cliente ou identificação)", example: "Pedido João Silva" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "Código de confirmação do pedido / pagamento", example: "ABC123XYZ" })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: "Endereço de entrega (UUID)", example: "4b160f1e-3f79-4d43-8b82-ea9de87e67a2" })
    @IsUUID()
    addressId: string;

    @ApiProperty({ description: "Usuário que fez o pedido (UUID)", example: "23a84d9f-b0e7-4a00-9437-aa2f10f0a3f1" })
    @IsUUID()
    userId: string;
}
