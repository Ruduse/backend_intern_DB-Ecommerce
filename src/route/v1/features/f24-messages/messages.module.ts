import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MessageController from './Messages.controller';
import MessageRepository from './Messages.repository';
import MessageService from './Messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MessageModule.name,
        schema: MessageService,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export default class MessageModule {}
