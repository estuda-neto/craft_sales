import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BrazilStates } from '../entities/address.entity';

export class CreateAddressDto {
  
  @ApiProperty({ description: 'País do endereço. Opcional.', example: 'Brasil', required: false})
  @IsString()
  country?: string;

  @ApiProperty({ description: 'CEP', example: 'Brasil', required: false})
  @IsString()
  CEP?: string;

  @ApiProperty({description: 'Estado brasileiro (UF). Campo obrigatório.',example: 'BA',enum: BrazilStates})
  @IsEnum(BrazilStates)
  @IsNotEmpty()
  state: BrazilStates;

  @ApiProperty({description: 'Cidade do endereço. Campo obrigatório.',example: 'Salvador'})
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({description: 'Bairro do endereço. Campo obrigatório.',example: 'Pituba'})
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({description: 'Rua e número. Campo obrigatório.',example: 'Av. Paulo VI, 1200',})
  @IsString()
  @IsNotEmpty()
  streetAndHouseNumber: string;
}
