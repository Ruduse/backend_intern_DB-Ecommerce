import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Bank {
  @Prop({ type: String, required: true, default: '' })
  name: string;

  @Prop({ type: String, required: true, default: '' })
  shortName: string;

  @Prop({ type: String, required: true, default: '' })
  branch: string;

  @Prop({ type: String, default: '' })
  thumbnail?: string;

  @Prop({ type: String, default: 'true' })
  isShow?: string;
}
export type BankDocument = Bank & Document;
export const BankSchema = SchemaFactory.createForClass(Bank);
