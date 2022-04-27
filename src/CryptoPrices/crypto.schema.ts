import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CryptoDocument = Crypto & Document;

@Schema()
export class Crypto {
  @Prop()
  label: string;

  @Prop()
  price: string;

  @Prop()
  updatedAt: number;
}

export const CryptoSchema = SchemaFactory.createForClass(Crypto);
