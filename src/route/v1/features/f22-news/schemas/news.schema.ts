import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'news' })
export class News {
  @Prop({ type: String, required: true })
  creatorId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  thumbnail?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Number, default: 0 })
  viewsCount: number;

  @Prop({ type: String, required: true, default: 'vi' })
  lang: string;
}

export type NewsDocument = News & Document;
export const NewsSchema = SchemaFactory.createForClass(News);
