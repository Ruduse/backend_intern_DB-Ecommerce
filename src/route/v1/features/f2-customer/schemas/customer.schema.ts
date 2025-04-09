import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../enums/gender';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Customer {
  @Prop({ type: String, default: '' })
  UserId: string;

  @Prop({ type: String, default: '' })
  fullName: string;

  @Prop({ type: String, enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: Number, default: '0' })
  points: number;

  @Prop({ type: Number, default: '', required: true })
  socialPhone: number;

  @Prop({ type: String, default: '' })
  socialEmail: string;

  @Prop({ type: Number, default: '', required: true })
  contactPhone: number;

  @Prop({ type: String, default: '' })
  contactEmail: string;

  @Prop({ type: String, default: '' })
  ReferralId: string;

  @Prop({ type: String, default: '' })
  myShareCode: string;

  @Prop({ type: String, default: '' })
  sharedCodeFrom: string;

  @Prop({ type: Date, default: '' })
  dateOfBirth: Date;

  @Prop({ type: Number, default: '0' })
  balance: number;

  @Prop({ type: [String], default: [] })
  savedProductIds: string[];

  @Prop({ type: [String], default: [] })
  shopVoucherIds: string;

  @Prop({ type: [String], default: [] })
  usedShopVoucherIds: string;
}
export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
