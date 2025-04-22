import UserService from '@authorization/a1-user/user.service';
import BaseService from '@base-inherit/base.service';
import NotificationService from '@common/c12-notification/notification.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { HttpService } from '@nestjs/axios'; // Thêm thư viện để gọi API Momo hoặc VNPAY
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
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
    private readonly httpService: HttpService, // Dùng để gọi API Momo hoặc VNPAY
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
      method: TransactionMethodEnum;
      userBank?: {
        userBankId: string;
        bankName: string;
        accountName: string;
        accountNumber: string;
      };
    },
  ) {
    const transaction: {
      userTo: Types.ObjectId;
      type: TransactionTypeEnum;
      method: TransactionMethodEnum;
      status: TransactionStatusEnum;
      money: number;
      content: string;
      image: string;
      userBank?: {
        userBankId: string;
        bankName: string;
        accountName: string;
        accountNumber: string;
      };
    } = {
      userTo: new Types.ObjectId(userId),
      type: TransactionTypeEnum.recharge,
      method: data.method,
      status: TransactionStatusEnum.pending,
      money: data.money,
      content: data.content || '',
      image: data.image || '',
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
    const currency = 'VND'; // thêm đơn vị tiền tệ

    return { balance, currency };
  }

  async updateTransactionStatus(id: string, status: TransactionStatusEnum) {
    return this.transactionRepository.updateOneById(id, { status });
  }

  /**
   * Tạo giao dịch nạp tiền với phương thức thanh toán online
   * @param userId
   * @param data
   */
  async createOnlineRechargeTransaction(
    userId: string,
    data: {
      money: number;
      method: TransactionMethodEnum;
      userBank?: {
        userBankId: string;
        bankName: string;
        accountName: string;
        accountNumber: string;
      };
    },
  ) {
    const transaction: {
      userTo: Types.ObjectId;
      type: TransactionTypeEnum;
      method: TransactionMethodEnum;
      status: TransactionStatusEnum;
      money: number;
      content: string;
      image: string;
      userBank?: {
        userBankId: string;
        bankName: string;
        accountName: string;
        accountNumber: string;
      };
    } = {
      userTo: new Types.ObjectId(userId),
      type: TransactionTypeEnum.recharge,
      method: data.method,
      status: TransactionStatusEnum.pending, // Trạng thái đang chờ thanh toán
      money: data.money,
      content: 'Recharge via ' + data.method,
      image: '',
    };

    const createdTransaction = await this.transactionRepository.create(
      transaction,
    );

    // Tạo yêu cầu thanh toán từ Momo hoặc VNPAY
    let paymentUrl: string = '';
    if (data.method === TransactionMethodEnum.momo) {
      paymentUrl = await this.createMomoPaymentUrl(data.money); // Gọi Momo API
    } else if (data.method === TransactionMethodEnum.vnpay) {
      paymentUrl = await this.createVnpayPaymentUrl(data.money); // Gọi VNPAY API
    }

    // Lưu URL thanh toán vào transaction (hoặc trả về cho client)
    await this.transactionRepository.updateOneById(createdTransaction._id, {
      paymentUrl,
    });

    return {
      transactionId: createdTransaction._id,
      paymentUrl,
    };
  }

  /**
   * Gọi API Momo để tạo URL thanh toán
   * @param amount
   * @returns
   */
  private async createMomoPaymentUrl(amount: number): Promise<string> {
    const momoApiUrl = 'https://api.momo.vn/transaction/create';
    const requestData = {
      amount,
      // Thêm các tham số cần thiết cho Momo API
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(momoApiUrl, requestData),
      );
      return response.data.paymentUrl; // Giả sử API trả về paymentUrl
    } catch (error) {
      this.logger.error('Momo API error: ', error);
      throw new Error('Failed to create Momo payment URL');
    }
  }

  /**
   * Gọi API VNPAY để tạo URL thanh toán
   * @param amount
   * @returns
   */
  private async createVnpayPaymentUrl(amount: number): Promise<string> {
    const vnpayApiUrl = 'https://api.vnpay.vn/transaction/create';
    const requestData = {
      amount,
      // Thêm các tham số cần thiết cho VNPAY API
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(vnpayApiUrl, requestData),
      );
      return response.data.paymentUrl; // Giả sử API trả về paymentUrl
    } catch (error) {
      this.logger.error('VNPAY API error: ', error);
      throw new Error('Failed to create VNPAY payment URL');
    }
  }

  /**
   * Xử lý webhook hoặc polling để xác nhận thanh toán
   * @param transactionId
   * @param paymentStatus
   */
  async confirmPayment(transactionId: string, paymentStatus: string) {
    if (paymentStatus === 'success') {
      await this.transactionRepository.updateOneById(transactionId, {
        status: TransactionStatusEnum.success, // Cập nhật trạng thái thành "success"
      });
    } else {
      await this.transactionRepository.updateOneById(transactionId, {
        status: TransactionStatusEnum.failed, // Nếu thanh toán thất bại
      });
    }
  }
}
