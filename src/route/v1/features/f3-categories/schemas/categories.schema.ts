import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  thumbnail: string;

  @Prop({ type: Number, default: 0 })
  position: number;

  @Prop({ type: Boolean, required: true })
  isShow: boolean;

  @Prop({ type: String, ref: 'Category', required: true })
  parentId: string;

  @Prop({ type: String, required: true })
  nameEn: string;
}

export type CategoriesDocument = Category & Document;
export const CategoriesSchema = SchemaFactory.createForClass(Category);
