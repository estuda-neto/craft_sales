import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber, IsPositive, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeOrigin } from 'src/modules/item/entities/item.entity';

export class RegisterItemToCarDto {
    @ApiPropertyOptional({ description: 'ID do item existente (caso esteja atualizando). Opcional.', example: 'f2b1e7b0-1c34-4e8c-bc10-9d3f5c18a1d2' })
    @IsOptional()
    @IsUUID()
    itemId?: string;

    @ApiProperty({ description: 'Variação de tamanho do produto.', example: 'XL' })
    @IsString()
    sizeVariation: string;

    @ApiProperty({ description: 'ID do produto ao qual este item pertence.', example: 'd7a3c4e0-9b12-4f45-a987-3c1de4a92f00' })
    @IsUUID()
    productId: string;

    @ApiProperty({ description: 'ID do carrinho.', example: '8bc1aa3c-96e5-44b8-8211-55763fd2e122' })
    @IsUUID()
    carId: string;

    @ApiProperty({ description: 'ID do pedido vinculado.', example: '1fa5c7b5-ecfa-4bb9-90e4-9cd12dbe39f1' })
    @IsUUID()
    orderId: string;

    @ApiProperty({ description: "Origem do item", enum: TypeOrigin, example: TypeOrigin.CAR })
    @IsNotEmpty()
    @IsString()
    typeOrigin: TypeOrigin;

    @ApiProperty({ description: 'Quantidade do produto.', example: 2, minimum: 1 })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    quantProduct: number;

    @ApiProperty({ description: 'Preço unitário do produto.', example: 149.90 })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    price: number;
}
