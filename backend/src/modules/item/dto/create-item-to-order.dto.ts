import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator";

export class CreateItemToOrderDto {
    
    @ApiProperty({ description: "ID do produto", example: "11f53e9f-23a7-4c11-a2d9-130d8a9e4f0a" })
    @IsUUID()
    productId: string;

    @ApiProperty({ description: "ID do pedido ", example: "4c160f1e-3f79-4d43-8b82-ea9de87e67a2" })
    @IsUUID()
    @IsOptional()
    orderId: string;

    @ApiProperty({ description: "Quantidade do produto", example: 3 })
    @IsNumber()
    @Min(1)
    quantProduct: number;

    @ApiProperty({ description: "Preço unitário", example: 49.90 })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({ description: "Variação de tamanho do produto", example: "P, M, G" })
    @IsString()
    @IsNotEmpty()
    sizeVariation: string;

}
