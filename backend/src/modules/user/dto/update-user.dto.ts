import { ApiPropertyOptional } from "@nestjs/swagger";
import {IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { TypeArtisan } from "../entities/user.entity";

export class UpdateUserDto {

  @ApiPropertyOptional({ description: "User`s Name" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: "User's phone number " })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: "User's Bio" })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: "Pontuação score" })
  @IsOptional()
  @IsNumber()
  score?: number;

   @ApiPropertyOptional({ description: "User photo URL" })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiPropertyOptional({ description: "AddressId (UUID)" })
  @IsOptional()
  @IsUUID()
  addressId?: string;

  @ApiPropertyOptional({ description: "Craftsman registration code" })
  @IsOptional()
  @IsString()
  craftsmanRegistration?: string;

  @ApiPropertyOptional({ description: "CICAB wallet number" })
  @IsOptional()
  @IsString()
  numberWalletCICAB?: string;

  @ApiPropertyOptional({ description: "Type of artisan (if user is ARTESAO)", enum: TypeArtisan})
  @IsOptional()
  @IsEnum(TypeArtisan)
  artisanType?: TypeArtisan;
}
