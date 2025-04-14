import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DiscountType } from '../enums/discountType';

@Schema({ timestamps: true, versionKey: false, collection: 'shopVoucher' })
export class shopVoucher {
  @Prop({ type: String, require: true, default: '' })
  shopId: string;

  @Prop({ type: String, required: true, default: '' })
  code: string;

  @Prop({ type: [String], require: true, default: '' })
  image?: string[];

  @Prop({ type: String, require: true, default: '' })
  name: string;

  @Prop({ type: String, require: true, default: '' })
  description: string;

  @Prop({ type: String, enum: DiscountType, require: true, default: '' })
  discountType: DiscountType;

  @Prop({ type: Number, required: true, default: '' })
  discountValue: number;

  @Prop({ type: Number })
  maxDiscountValue?: number;

  @Prop({ type: Number, require: true, default: true })
  minOrderValue: number;

  @Prop({ type: Number, require: true, default: '' })
  maxUses: number;

  @Prop({ type: Number, require: true, default: '' })
  usedCount: number;

  @Prop({ type: Number, require: true, default: '' })
  maxUsesPerUser: number;

  @Prop({ type: [String], required: true, default: true })
  isActive: string[];

  @Prop({ type: Boolean, require: true, default: true })
  isSendNotification: boolean;

  @Prop({ type: String, require: true, default: '' })
  nameEn: string;

  @Prop({ type: String, default: '' })
  descriptionEn: string;

  @Prop({ type: Number, required: true })
  validFrom: number;

  @Prop({ type: Number, require: true })
  validTo: number;

  @Prop({
    type: String,
    enum: ['all', 'customer'],
    require: true,
    default: true,
  })
  applyTo: string;

  @Prop({ type: [String], require: true, default: '' })
  customerIds: string[];
}

export type ShopVoucherDocument = shopVoucher & Document;
export const ShopVoucherSchema = SchemaFactory.createForClass(shopVoucher);
