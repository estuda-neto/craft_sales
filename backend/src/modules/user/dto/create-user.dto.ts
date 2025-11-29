import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TypeUser } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'CPF do usuário' })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Data de nascimento do usuário (YYYY-MM-DD)', example: '1995-08-21' })
  @IsNotEmpty()
  @IsDateString({}, { message: 'dateOfBirth deve estar no formato YYYY-MM-DD' })
  dateOfBirth: Date;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Repetição da senha para validação', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  repeatPassword: string;

  @ApiPropertyOptional({ description: 'Telefone do usuário' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Tipo de usuário', enum: [TypeUser.CLIENTE, TypeUser.ARTESAO] })
  @Transform(({ value }) => value.toUpperCase())
  @IsIn([TypeUser.CLIENTE, TypeUser.ARTESAO], { message: 'typeuser deve ser "CLIENTE" ou "ARTESAO"' })
  typeuser: TypeUser;

}
