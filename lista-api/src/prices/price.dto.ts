// price.dto.ts
import { IsString, IsNumber, IsISO8601, IsOptional, IsBoolean } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  producto: string;

  @IsOptional()
  fecha: string;

  @IsString()
  comercio: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  descuento: boolean;
}

export class UpdatePriceDto {
  @IsString()
  @IsOptional()
  producto: string;

  @IsOptional()
  fecha: string;

  @IsString()
  @IsOptional()
  comercio: string;

  @IsNumber()
  @IsOptional()
  precio: number;

  @IsBoolean()
  @IsOptional()
  descuento: boolean;
}
