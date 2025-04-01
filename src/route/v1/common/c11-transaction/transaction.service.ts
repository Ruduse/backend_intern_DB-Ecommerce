import UserService from '@authorization/a1-user/user.service';
import BaseService from '@base-inherit/base.service';
import NotificationService from '@common/c12-notification/notification.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TransactionDocument } from './schemas/transaction.schema';
import TransactionRepository from './transaction.repository';

@Injectable()
export default class TransactionService extends BaseService<TransactionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly transactionRepository: TransactionRepository,
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService,
    readonly notificationService: NotificationService,
  ) {
    super(logger, transactionRepository);
  }

  /**
   * Create many
   *
   * @param item
   * @returns
   */
  async createMany(item: any[]) {
    return this.transactionRepository.createMany(item);
  }
}
