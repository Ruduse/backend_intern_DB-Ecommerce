import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../enums/gender';

@Schema({ timestamps: true, versionKey: false, collection: 'customers' })
export class Customer {
  @Prop({ type: String, required: true, default: '' })
  UserId: string;

  @Prop({ type: String, required: true, default: '' })
  fullName: string;

  @Prop({ type: String, enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Prop({
    type: String,
    default:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
  })
  avatar: string;

  @Prop({ type: Number, default: 0 })
  points: number;

  @Prop({ type: Number, default: 0, required: true })
  socialPhone: number;

  @Prop({ type: String, required: true })
  socialEmail: string;

  @Prop({ type: Number, default: 0, required: true })
  contactPhone: number;

  @Prop({ type: String, default: '@gmail.com' })
  contactEmail: string;

  @Prop({ type: String, required: true, default: '' })
  ReferralId: string;

  @Prop({ type: String, default: '' })
  myShareCode: string;

  @Prop({ type: String, default: '' })
  sharedCodeFrom: string;

  @Prop({ type: Date, required: true, default: null })
  dateOfBirth: Date;

  @Prop({ type: Number, default: '0' })
  balance: number;

  @Prop({ type: [String], required: true, default: [] })
  savedProductIds: string[];

  @Prop({ type: [String], required: true, default: [] })
  shopVoucherIds: string;

  @Prop({ type: [String], default: [] })
  usedShopVoucherIds: string[];
}
export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
