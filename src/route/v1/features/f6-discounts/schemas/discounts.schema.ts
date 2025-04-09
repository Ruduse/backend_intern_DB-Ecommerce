import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'discounts' })
export class Discount {
  @Prop({ type: String, ref: 'Shop', required: true })
  creatorId: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: [String], required: true })
  image: string[];

  @Prop({ type: Number, required: true })
  name: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: false })
  discountType: number;

  @Prop({ type: Date, required: true })
  discountValue: Date;

  @Prop({ type: Date, required: true })
  validFrom: Date;

  @Prop({ type: String, ref: 'Shop', required: true })
  validTo: string;

  @Prop({ type: String, required: true, unique: true })
  maxUses: string;

  @Prop({ type: String, required: true, enum: ['percentage', 'fixed'] })
  usersUsed: string;

  @Prop({ type: Number, required: true })
  maxUsesPerUser: number;

  @Prop({ type: Number, required: true })
  minOrderValue: number;

  @Prop({ type: Number, required: false })
  isActive: number;

  @Prop({ type: Date, required: true })
  applyTo: Date;

  @Prop({ type: Date, required: true })
  productIds: Date;

  @Prop({ type: String, ref: 'Shop', required: true })
  skuIds: string;

  @Prop({ type: String, required: true, unique: true })
  isSendNotification: string;

  @Prop({ type: String, required: true, enum: ['percentage', 'fixed'] })
  nameEn: string;

  @Prop({ type: Number, required: true })
  descriptionEn: number;

  @Prop({ type: Number, required: false })
  bulkDiscount: number;
}

export const DiscountsSchema = SchemaFactory.createForClass(Discount);
