import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({ type: String, ref: 'Shop', required: true })
  creatorId: string;

  @Prop({ type: [String], ref: 'Category', required: true, default: [] })
  categoryIds: string[];

  @Prop({ type: String, ref: 'Brand', required: true })
  brandId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: String, default: [] })
  video: string;
  @Prop({ type: [String], required: true, default: [] })
  warranties: string[];

  @Prop({ type: Number, required: true })
  viewsCount: number;

  @Prop({ type: Number, required: true })
  soldCount: number;

  @Prop({ type: Number })
  reviewsCount: number;

  @Prop({ type: Number, required: true })
  totalRatings: number;

  @Prop({ type: Number, default: true })
  likedCount: number;

  @Prop({ type: Boolean, default: false })
  isHot: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isNew: boolean;

  @Prop({ type: Number, required: true })
  isRewardPoint: number;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  @Prop({ type: String })
  skuMin: string;

  @Prop({ type: String, required: true })
  skuMax: string;

  @Prop({ type: String, default: true })
  skuIds: string;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: true })
  nameEn: string;

  @Prop({ type: String, required: true })
  descriptionEn: string;

  @Prop({ type: String })
  idProductBravo: string;
}

export type ProductsDocument = Product & Document;
export const ProductsSchema = SchemaFactory.createForClass(Product);
