import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ConversationController from './conversation.controller';
import ConversationRepository from './conversation.repository';
import ConversationService from './conversation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConversationModule.name,
        schema: ConversationService,
      },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
  exports: [ConversationService, ConversationRepository],
})
export default class ConversationModule {}
