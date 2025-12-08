import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CheckCarDto {
    @ApiProperty({ description: 'ID do carrinho que será verificado.', example: '0aa1c16d-9b92-4757-9bc3-15b8a7b5ef45' })
    @IsUUID()
    carId: string;

    @ApiProperty({ description: 'ID do usuário proprietário do carrinho.', example: 'd12b4ae8-3c2f-4a5a-bca0-8a4bbd8c9e43' })
    @IsUUID()
    userId: string;
}
