// src/products/product.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Product {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripción: string;

  @Prop({ required: true, unique: true })
  barcode: string;

  @Prop({default: 0})
  quantity: number;

  @Prop()
  weight: number;

  @Prop()
  volume: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
