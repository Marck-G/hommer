import { IsString, IsNumber, IsOptional, isNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

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
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

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
}
