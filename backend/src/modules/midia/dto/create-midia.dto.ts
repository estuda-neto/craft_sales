import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { TypeMidia } from '../entities/midia.entity';

export class CreateMidiaDto {

    @ApiProperty({ description: 'Link da mídia (URL)', example: 'https://meu-servidor.com/uploads/video.mp4' })
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    link: string;

    @ApiProperty({ description: 'Tipo da mídia', enum: TypeMidia, example: TypeMidia.VIDEO })
    @IsEnum(TypeMidia)
    @IsNotEmpty()
    typeMidia: TypeMidia;

    @ApiProperty({ description: 'Rota interna onde a mídia será armazenada', example: '/uploads/empresa123/' })
    @IsString()
    @IsNotEmpty()
    route: string;
}

