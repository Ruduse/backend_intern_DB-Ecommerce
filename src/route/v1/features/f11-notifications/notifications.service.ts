import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import NotificationsRepository from './notifications.repository';
import { NotificationDocument } from './schemas/notifications.schema';

@Injectable()
export default class NotificationsService extends BaseService<NotificationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: NotificationsRepository,
  ) {
    super(logger, testRepository);
  }
}
