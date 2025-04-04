import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type ProductsDocument = Product & Document;
export const ProductsSchema = SchemaFactory.createForClass(Product);
