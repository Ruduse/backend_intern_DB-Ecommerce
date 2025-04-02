import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shops' })
export class Sku {
  @Prop({ type: String, req: 'Product', required: true, auto: true }) // ObjectId tự động sinh
  productId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({
    type: [{ name: String, value: String }],
    default: [],
  })
  attributes: Array<{ name: string; value: string }>;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type SkuDocument = Sku & Document;
export const SkuSchema = SchemaFactory.createForClass(Sku);
