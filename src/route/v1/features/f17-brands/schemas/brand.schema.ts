import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Brand {
  @Prop({ type: String, require: true, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  thumbnail: string;

  @Prop({ type: Boolean, require: true, default: true })
  isShow: boolean;

  @Prop({ type: String, require: true, default: '' })
  posittion: string;
}

export type BrandDocument = Brand & Document;
export const BrandSchema = SchemaFactory.createForClass(Brand);
