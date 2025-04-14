import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import MessageController from './messages.controller';
import MessageRepository from './messages.repository';
import MessageService from './messages.service';
import { Message, MessageSchema } from './schemas/messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export default class MessageModule {}
