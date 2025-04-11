import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class UserBank {
  @Prop({ type: String, require: true, default: '' })
  userId: string;

  @Prop({ type: String, required: true, default: '' })
  bankId: string;

  @Prop({ type: String, require: true, default: '' })
  accountName: string;

  @Prop({ type: Number, require: true, default: '' })
  accountNumber: number;

  @Prop({ type: String, require: true, default: '' })
  holder: string;

  @Prop({ type: String, default: '' })
  passport: string;

  @Prop({ type: Number, require: true, default: '' })
  phone: number;

  @Prop({ type: Date, require: true, default: '' })
  expirationDate: Date;

  @Prop({ type: String, require: true, default: '' })
  ccv: string;

  @Prop({ type: Boolean, default: false })
  isStoreBank: boolean;
}

export type UserBankDocument = UserBank & Document;
export const UserBankSchema = SchemaFactory.createForClass(UserBank);
