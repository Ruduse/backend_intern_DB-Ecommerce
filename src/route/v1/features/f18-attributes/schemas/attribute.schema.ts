import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Attribute {
  @Prop({ required: true })
  creatorId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['STRING', 'NUMBER', 'BOOLEAN'] })
  valueType: string;
}
export type AttributeDocument = Attribute & Document;
export const AttributeSchema = SchemaFactory.createForClass(Attribute);
