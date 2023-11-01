// price.dto.ts
import { IsString, IsNumber, IsISO8601, IsOptional } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  producto: string;

  @IsISO8601()
  fecha: string;

  @IsString()
  comercio: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  descuento: number;
}

export class UpdatePriceDto {
  @IsString()
  @IsOptional()
  producto: string;

  @IsISO8601()
  @IsOptional()
  fecha: string;

  @IsString()
  @IsOptional()
  comercio: string;

  @IsNumber()
  @IsOptional()
  precio: number;

  @IsNumber()
  @IsOptional()
  descuento: number;
}
