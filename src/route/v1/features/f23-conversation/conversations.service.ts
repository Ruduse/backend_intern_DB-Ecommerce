import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import ConversationRepository from './conversations.repository';
import { ConversationDocument } from './schemas/conversations.schema';

@Injectable()
export default class ConversationService extends BaseService<ConversationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly conversationRepository: ConversationRepository,
  ) {
    super(logger, conversationRepository);
  }
}
