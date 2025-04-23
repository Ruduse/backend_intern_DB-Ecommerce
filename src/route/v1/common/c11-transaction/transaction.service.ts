import UserService from '@authorization/a1-user/user.service';
import BaseService from '@base-inherit/base.service';
import NotificationService from '@common/c12-notification/notification.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { HttpService } from '@nestjs/axios'; // Thêm thư viện để gọi API Momo hoặc VNPAY
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ConfirmBankTransferDto } from './dto/confirm-bank-transfer.dto';
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

  //xem tiền trong ví
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

  //Nap tiền vào ví, cách thức chuyển khoan
  async initiateTopup(
    { amount, method }: { amount: number; method: string },
    userId: string,
  ) {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    if (method === TransactionMethodEnum.transfer) {
      const content = `${userId}-${amount}`;
      return {
        method: TransactionMethodEnum.transfer,
        bankInfo: {
          bankName: 'Vietcombank',
          accountNumber: '1012324567',
          accountName: 'Izi Software',
          transferContent: content,
        },
      };
    }

    if (method === TransactionMethodEnum.vnpay) {
      const payUrl = await this.createVnpayPaymentUrl(userId, amount);
      return { method: TransactionMethodEnum.vnpay, payUrl };
    }

    if (method === TransactionMethodEnum.momo) {
      const payUrl = await this.createMomoPaymentUrl(userId, amount);
      return { method: TransactionMethodEnum.momo, payUrl };
    }

    throw new Error('Unsupported payment method');
  }

  private async createMomoPaymentUrl(
    userId: string,
    amount: number,
  ): Promise<string> {
    const momoApiUrl = 'https://api.momo.vn/transaction/create';
    const requestData = {
      userId,
      amount,
      // Thêm các tham số cần thiết cho Momo API
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(momoApiUrl, requestData),
      );
      return response.data.paymentUrl;
    } catch (error) {
      this.logger.error('Momo API error: ', error);
      throw new Error('Failed to create Momo payment URL');
    }
  }

  private async createVnpayPaymentUrl(
    userId: string,
    amount: number,
  ): Promise<string> {
    const vnpayApiUrl = 'https://api.vnpay.vn/transaction/create';
    const requestData = {
      userId,
      amount,
      // Thêm các tham số cần thiết cho VNPAY API
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(vnpayApiUrl, requestData),
      );
      return response.data.paymentUrl;
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
  async updateTransactionStatus(id: string, status: TransactionStatusEnum) {
    return this.transactionRepository.updateOneById(id, { status });
  }

  async confirmBankTransfer(dto: ConfirmBankTransferDto, userId: string) {
    const { amount, transferContent, transferImageUrl } = dto;

    const now = new Date();

    const topup = await this.transactionRepository.create({
      userId,
      amount,
      method: 'TRANSFER',
      status: 'PENDING',
      paymentInfo: {
        transferContent,
        transferImageUrl,
        bankName: 'Vietcombank',
        accountNumber: '1012324567',
        accountName: 'Izi Software',
      },
      createdAt: now,
      updatedAt: now,
    });

    return {
      message: 'Đã ghi nhận chuyển khoản. Chờ xác minh từ admin.',
      topupId: topup._id,
      status: topup.status,
    };
  }

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
