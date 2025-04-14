import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'conversations' })
export class Conversation {
  @Prop({ type: [String], required: true })
  userIds: string[];

  @Prop({ type: String, required: false })
  lastMessage?: string;
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
