import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  parentId: Types.ObjectId;
  @Prop({ type: String, required: true })
  name: string;
}

export type CategoriesDocument = Category & Document;
export const CategoriesSchema = SchemaFactory.createForClass(Category);
