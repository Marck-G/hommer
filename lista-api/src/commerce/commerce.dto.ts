import { IsString, IsOptional } from 'class-validator';

export class CreateCommerceDto {
    @IsString()
    nombre: string;

    @IsString()
    localidad: string;

    @IsString()
    provincia: string;

    @IsString()
    country: string;

    @IsString()
    identificador: string;
}

export class UpdateCommerceDto {
    @IsString()
    @IsOptional()
    nombre: string;

    @IsString()
    @IsOptional()
    localidad: string;

    @IsString()
    @IsOptional()
    provincia: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsString()
    @IsOptional()
    identificador: string;
}

export class SearchCommerceDto {
    @IsString()
    nombre: string;
  }