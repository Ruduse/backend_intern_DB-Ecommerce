import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'branches' })
export class Branch {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  description?: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  provinceId: string;

  @Prop({ type: String, required: true })
  districtId: string;

  @Prop({ type: String, required: true })
  villageId: string;

  @Prop({ type: String, default: '' })
  street?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type BranchDocument = Branch & Document;
export const BranchSchema = SchemaFactory.createForClass(Branch);
