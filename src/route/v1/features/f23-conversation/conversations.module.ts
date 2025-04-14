import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ConversationController from './conversations.controller';
import ConversationRepository from './conversations.repository';
import ConversationService from './conversations.service';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversations.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Conversation.name,
        schema: ConversationSchema,
      },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
  exports: [ConversationService, ConversationRepository],
})
export default class ConversationModule {}
