import UserService from '@authorization/a1-user/user.service';
import BaseService from '@base-inherit/base.service';
import NotificationService from '@common/c12-notification/notification.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TransactionMethodEnum } from './enums/transaction-method.enum';
import { TransactionStatusEnum } from './enums/transaction-status.enum';
import { TransactionTypeEnum } from './enums/transaction-type.enum';
import { TransactionDocument } from './schemas/transaction.schema';
import TransactionRepository from './transaction.repository';

@Injectable()
export default class TransactionService extends BaseService<TransactionDocument> {
  update(id: string, arg1: { status: TransactionStatusEnum }) {
    throw new Error('Method not implemented.');
  }
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

  /**
   * Tạo giao dịch nạp tiền
   * @param userId
   * @param data
   */
  async createRechargeTransaction(
    userId: string,
    data: {
      money: number;
      content?: string;
      image?: string;
      userBank: {
        userBankId: string;
        bankName: string;
        accountName: string;
        accountNumber: string;
      };
    },
  ) {
    const transaction = {
      userTo: new Types.ObjectId(userId),
      type: TransactionTypeEnum.recharge,
      method: TransactionMethodEnum.tranfer,
      status: TransactionStatusEnum.pending,
      money: data.money,
      content: data.content || '',
      image: data.image || '',
      userBankReceived: {
        userBankId: data.userBank.userBankId,
        bankName: data.userBank.bankName,
        accountName: data.userBank.accountName,
        accountNumber: data.userBank.accountNumber,
      },
    };

    const created = await this.transactionRepository.create(transaction);

    // Gửi thông báo nếu cần
    // await this.notificationService.notifyRechargePending(userId);

    return created;
  }
  async getWalletBalance(
    userId: string,
  ): Promise<{ balance: number; currency: string }> {
    const [income, outcome] = await Promise.all([
      this.transactionRepository.sumMoney({
        userTo: userId,
        status: TransactionStatusEnum.success,
      }),
      this.transactionRepository.sumMoney({
        userFrom: userId,
        status: TransactionStatusEnum.success,
      }),
    ]);

    const balance = income - outcome;
    const currency = 'VND'; // Add your currency here

    return { balance, currency };
  }

  async updateTransactionStatus(id: string, status: TransactionStatusEnum) {
    return this.transactionRepository.updateOneById(id, { status });
  }
}
