import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Banner {
  @Prop({ type: String, require: true, default: '' })
  name: string;

  @Prop({ type: [String], required: true, default: '' })
  image: string[];

  @Prop({ type: String, require: true, default: '' })
  link: string;

  @Prop({ type: Boolean, require: true, default: true })
  isShow: boolean;

  @Prop({ type: String, require: true, default: '' })
  posittion: string;
}

export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
