import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateAssessmentDto {

    @ApiProperty({ description: 'Nota dada ao produto, variando normalmente de 1 a 5.', example: 4.5 })
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;

    @ApiProperty({ description: 'Descrição ou comentário sobre o produto.', example: 'Produto excelente, entrega rápida!' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'ID do produto ao qual esta avaliação pertence.', example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsUUID()
    @IsNotEmpty()
    productId: string;
}
