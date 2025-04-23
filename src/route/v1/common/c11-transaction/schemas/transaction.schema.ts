import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { UserBank, UserBankSchema } from './user-bank.schema';

export interface MultipleLanguage {
  [key: string]: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
  @Prop({ type: String, ref: 'User' })
  readonly userFrom: string;

  @Prop({ type: String, ref: 'User' })
  readonly userTo: string;

  @Prop({
    type: String,
    enum: TransactionTypeEnum,
    default: TransactionTypeEnum.recharge,
  })
  readonly type: TransactionTypeEnum;

  @Prop({
    type: String,
    enum: TransactionMethodEnum,
    default: TransactionMethodEnum.transfer,
  })
  readonly method: TransactionMethodEnum;

  @Prop({
    type: String,
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.pending,
  })
  readonly status: TransactionStatusEnum;

  @Prop({ type: Number, default: 0 })
  readonly clovers: number;

  @Prop({ type: String, default: '' })
  readonly tittle: string;

  @Prop({ type: Number, default: 0 })
  readonly money: number;

  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: UserBankSchema, default: '' })
  readonly userBank: UserBank;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
