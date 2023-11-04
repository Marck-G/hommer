// src/commerce/commerce.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID, randomUUID } from 'crypto';
import { Document, Types } from 'mongoose';

@Schema()
export class Barcode {
  @Prop({ required: true, type: Types.ObjectId })
  producto: string;

  @Prop({required: true})
  barcode: string;

}

export type BarcodeDocument = Barcode & Document;
export const BarcodeSchema = SchemaFactory.createForClass(Barcode);
