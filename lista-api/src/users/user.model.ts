import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  img: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);