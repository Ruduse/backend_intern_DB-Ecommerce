import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'discounts' })
export class Discount {
  @Prop({ required: true })
  shopId: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, enum: ['percentage', 'fixed'] })
  discountType: string;

  @Prop({ required: true })
  discountValue: number;

  @Prop({ required: true })
  minOrderValue: number;

  @Prop({ required: false })
  maxDiscount?: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const DiscountsSchema = SchemaFactory.createForClass(Discount);