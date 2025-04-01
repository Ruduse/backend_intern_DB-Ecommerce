import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'categorie' })
export class Categories {
  @Prop({ type: Types.ObjectId, ref: 'Categorie', required: true })
  parentId: Types.ObjectId;
  @Prop({ type: String, required: true })
  name: string;
}

export type CategoriesDocument = Categories & Document;
export const CategoriesSchema = SchemaFactory.createForClass(Categories);
