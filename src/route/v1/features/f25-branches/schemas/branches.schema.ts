import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'Branch' })
export class Branch {
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

export type BranchDocument = Branch & Document;
export const BranchSchema = SchemaFactory.createForClass(Branch);
