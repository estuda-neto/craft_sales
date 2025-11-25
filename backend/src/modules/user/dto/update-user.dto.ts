import { ApiPropertyOptional } from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString } from "class-validator";

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

  @ApiPropertyOptional({ description: "User's country" })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: "User's state" })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: "User's city" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: "User's address" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: "Pontuação score" })
  @IsOptional()
  @IsNumber()
  score?: number;
}
