import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Dashboard {
  @Prop({ type: Object, default: {} })
  statics: Object;

  @Prop({ type: String, default: '' })
  image: string;
}

export type DashboardDocument = Dashboard & Document;
export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
