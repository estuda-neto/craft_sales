import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, IsArray, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiPropertyOptional({ description: "Product image URL" })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({ description: "Is on sale?" })
    @IsOptional()
    @IsBoolean()
    onSale?: boolean;

    @ApiPropertyOptional({ description: "Discount percentage (0–100)" })
    @IsOptional()
    @IsNumber()
    @Min(0)
    discountpercentage?: number;

    @ApiPropertyOptional({
        description: "Category IDs (UUID array)",
        example: ["d4d17806-58fa-45f0-ba6e-24a32c91b233"],
    })
    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    categoriesIds?: string[];
}
