import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'discounts' })
export class Discount {
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true, enum: ['percentage', 'fixed'] })
  discountType: string;

  @Prop({ type: Number, required: true })
  discountValue: number;

  @Prop({ type: Number, required: true })
  minOrderValue: number;

  @Prop({ type: Number, required: false })
  maxDiscount?: number;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;
}

export const DiscountsSchema = SchemaFactory.createForClass(Discount);
