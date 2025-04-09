import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shops' })
export class Sku {
  @Prop({ type: String, req: 'Product', required: true, auto: true }) // ObjectId tự động sinh
  productId: string;

  @Prop({ type: String, required: true })
  skuCode: string;

  @Prop({ type: Number, required: true })
  originalPrice: number;

  @Prop({ type: Number, required: true })
  basePrice: number;

  @Prop({
    type: [{ name: String, value: String }],
    default: [],
  })
  attributes: Array<{ name: string; value: string }>;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: String, req: 'Product', required: true, auto: true }) // ObjectId tự động sinh
  thumbnail: string;

  @Prop({ type: Boolean, required: true, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({ type: Number, required: true })
  soldCount: number;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type SkuDocument = Sku & Document;
export const SkuSchema = SchemaFactory.createForClass(Sku);
