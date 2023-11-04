import { IsString, IsNumber, IsOptional, isNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripción: string;

  @IsOptional()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsOptional()
  @IsNumber()
  volume: number;

  @IsOptional()
  @IsNumber()
  units: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripción: string;

  @IsString()
  @IsOptional()
  barcode: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsOptional()
  @IsNumber()
  volume: number;

  @IsOptional()
  @IsNumber()
  units: number;
}
