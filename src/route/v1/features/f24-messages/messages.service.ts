import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import MessageRepository from './messages.repository';
import { MessageDocument } from './schemas/messages.schema';

@Injectable()
export default class MessageService extends BaseService<MessageDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly messageRepository: MessageRepository,
  ) {
    super(logger, messageRepository);
  }
}
