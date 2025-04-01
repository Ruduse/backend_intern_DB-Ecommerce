import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'notifications' })
export class Notification {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  senderId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  recipientId: Types.ObjectId;

  @Prop({ type: String, required: true })
  notificationType: string;

  @Prop({ type: String, required: true })
  entityName: string;

  @Prop({ type: Types.ObjectId, required: true, refPath: 'entityName' })
  entityId: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: false })
  description: string;
  @Prop({ type: String, required: false })
  thumbnail: string;
  @Prop({ required: false, default: false })
  isOpened: boolean;
  @Prop({ type: Object, required: false })
  options: Record<string, any>;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notification);
