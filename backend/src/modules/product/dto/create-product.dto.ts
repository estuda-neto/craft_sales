import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, IsUUID, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ description: "Product name", example: "Vaso de cerâmica artesanal" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Product price", example: 120.50 })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({ description: "Stock quantity", example: 15 })
    @IsNumber()
    @Min(0)
    quantStock: number;

    @ApiProperty({ description: "Product description", example: "Vaso feito à mão, ideal para decoração." })
    @IsString()
    description: string;

    @ApiProperty({ description: "Usuário que criou e oferece esse produto", example: "23a84d9f-b0e7-4a00-9437-aa2f10f0a3f1" })
    @IsUUID()
    userId: string;
}
