
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductDocument } from '../products/product.model';
import { CommerceDocument } from '../commerce/commerce.model';

@Schema()
export class Price {
  @Prop({ type: Types.ObjectId, required: true })
  producto: ProductDocument;

  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: Types.ObjectId, required: true })
  comercio: CommerceDocument;

  @Prop({ required: true })
  precio: number;

  @Prop()
  descuento: number;
}

export type PriceDocument = Price & Document;
export const PriceSchema = SchemaFactory.createForClass(Price);
