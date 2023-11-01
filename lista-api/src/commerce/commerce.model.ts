// src/commerce/commerce.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class Commerce {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  localidad: string;

  @Prop()
  provincia: string;

  @Prop({default: "Spain"})
  country: string;

  @Prop({ required: true, unique: true, default: randomUUID() })
  identificador: string;
}

export type CommerceDocument = Commerce & Document;
export const CommerceSchema = SchemaFactory.createForClass(Commerce);
