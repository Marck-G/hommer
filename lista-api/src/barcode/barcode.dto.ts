// barcode.dto.ts
import { IsString } from 'class-validator';

export class CreateBarcodeDto {
  @IsString()
  producto: string;

  @IsString()
  barcode: string;
}

export class UpdateBarcodeDto {
  @IsString()
  producto: string;

  @IsString()
  barcode: string;
}
