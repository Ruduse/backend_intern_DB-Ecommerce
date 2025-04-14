import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shops' })
export class Shop {
  @Prop({ type: String, default: '' })
  userId: string;

  @Prop({ type: String, default: '' })
  fullName: string;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: String, default: '' })
  banner: string;

  @Prop({ type: Number, default: 0, required: true })
  SocialPhone: number;

  @Prop({ type: String, default: '' })
  SocialMail: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Province', required: true })
  provinceId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'District' })
  districtId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Village', required: true })
  villageId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, default: '', required: true })
  street: string;

  @Prop({ type: String, default: '', required: true })
  location: string;

  @Prop({ type: Number, default: 0 })
  totalRatings: number;

  @Prop({ type: Number, default: 0 })
  totalReviews: number;

  @Prop({ type: Number, default: 0 })
  totalProducts: number;
}

export type ShopDocument = Shop & Document;
export const ShopSchema = SchemaFactory.createForClass(Shop);
