import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shops' })
export class Shop {
  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, default: '' })
  logo: string;

  @Prop({ type: String, default: '' })
  coverImage: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type ShopDocument = Shop & Document;
export const ShopSchema = SchemaFactory.createForClass(Shop);
