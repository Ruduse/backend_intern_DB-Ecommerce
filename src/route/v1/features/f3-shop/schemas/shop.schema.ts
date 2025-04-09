import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Shop {
  @Prop({ type: String, default: '' })
  userId: string;

  @Prop({ type: String, default: '' })
  fullName: string;
  @Prop({ type: String, default: '' })
  avatar: string;
  @Prop({ type: String, default: '' })
  banner: string;
  @Prop({ type: Number, default: '', required: true })
  SocialPhone: number;
  @Prop({ type: String, default: '' })
  SocialMail: string;
  @Prop({ type: String, ref: 'Province', default: '', required: true })
  provinceId: string;
  @Prop({ type: String, ref: 'District', default: '' })
  districtId: string;
  @Prop({ type: String, ref: 'Village', default: '', required: true })
  villageId: string;
  @Prop({ type: String, default: '', required: true })
  street: string;
  @Prop({ type: String, default: '', required: true })
  location: string;
  @Prop({ type: Number, default: '' })
  totalRatings: number;
  @Prop({ type: Number, default: '' })
  totalReviews: number;
  @Prop({ type: Number, default: '' })
  totalProducts: number;
}

export type ShopDocument = Shop & Document;
export const ShopSchema = SchemaFactory.createForClass(Shop);
