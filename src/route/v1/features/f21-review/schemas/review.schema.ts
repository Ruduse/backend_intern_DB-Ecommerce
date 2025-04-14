import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'reviews' })
export class Review {
  @Prop({ type: String, required: true })
  orderId: string;

  @Prop({ type: String, required: true })
  productId: string;

  @Prop({ type: String, required: true })
  skuId: string;

  @Prop({ type: String, required: true })
  customerId: string;

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: [String], default: [] })
  attachments: string[];

  @Prop({ type: String, default: '' })
  content: string;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: String, default: null })
  replyId: string | null;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
