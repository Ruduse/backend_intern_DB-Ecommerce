import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  TransactionMethod,
  TransactionStatus,
  TransactionType,
} from '../enums/transaction.enums';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Transaction {
  @Prop({ type: String, default: '', required: true })
  userFrom: string;

  @Prop({ type: String, default: '', required: true })
  userTo: string;

  @Prop({ type: String, enum: TransactionMethod, reqyired: true, default: '' })
  method: TransactionMethod;

  @Prop({ type: String, enum: TransactionStatus, required: true, default: '' })
  status: TransactionStatus;

  @Prop({ type: String, enum: TransactionType, required: true, default: '' })
  transactionType: string;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, required: true, default: '' })
  money: string;

  @Prop({ type: String, default: '' })
  image: string;

  @Prop({ type: String, default: '' })
  content: string;

  @Prop({
    type: {
      userBankId: { type: String, default: '' },
      bankName: { type: String, default: '' },
      accountName: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
    },
    _id: false,
  })
  userBankReceived: {
    userBankId: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
