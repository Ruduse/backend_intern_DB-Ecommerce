import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';

export interface MultipleLanguage {
  [key: string]: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
  @Prop({ type: String, ref: 'User' })
  readonly userId: string;

  @Prop({ type: String })
  readonly entityId: string;

  @Prop({
    type: String,
    enum: TransactionTypeEnum,
    default: TransactionTypeEnum.COMPLETED_MISSION,
  })
  readonly type: TransactionTypeEnum;

  @Prop({
    type: String,
    enum: TransactionMethodEnum,
    default: TransactionMethodEnum.MONEY,
  })
  readonly method: TransactionMethodEnum;

  @Prop({
    type: String,
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.CHECKING,
  })
  readonly status: TransactionStatusEnum;

  @Prop({ type: Number, default: 0 })
  readonly clovers: number;

  @Prop({ type: Number, default: 0 })
  readonly money: number;

  @Prop({ type: String, default: '' })
  readonly options: string;

  @Prop({ type: String, default: '' })
  readonly transactionCode: string;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
