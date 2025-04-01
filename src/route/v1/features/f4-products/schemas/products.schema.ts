import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shops' })
export class Products {
  @Prop({ type: Types.ObjectId, ref: 'Shops', required: true })
  shopId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Categories', required: true })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type ProductsDocument = Products & Document;
export const ProductsSchema = SchemaFactory.createForClass(Products);
