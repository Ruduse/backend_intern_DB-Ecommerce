import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { LangEnum } from '@enum/lang.enum';
import { convertDataByLang } from '@helper/convert-data-lang';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import { ConfirmBankTransferDto } from './dto/confirm-bank-transfer.dto';
import CreateTransactionDto from './dto/create-transaction.dto';
import UpdateTransactionDto from './dto/update-transaction.dto';
import { TransactionStatusEnum } from './enums/transaction-status.enum';
import TransactionService from './transaction.service';

@ApiTags('Transactions')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    /* eslint-disable no-param-reassign */
    const lang = query.language ?? LangEnum.english;
    delete query.language;
    /* eslint-enable no-param-reassign */

    const result = await this.transactionService.findManyBy(query);

    result.forEach((item: any) => {
      convertDataByLang(item, lang, ['title', 'content']);
    });

    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateTransactionDto): Promise<any> {
    const result = await this.transactionService.create(body);

    return result;
  }

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Get('MyWallet')
  @HttpCode(200)
  async getWalletBalance(
    @Headers('authorization-userid') userId: string,
  ): Promise<{ balance: number; currency: string }> {
    return this.transactionService.getWalletBalance(userId);
  }

  // @Post('recharge')
  // async recharge(
  //   @Headers('authorization-userid') userId: string,
  //   @Body() dto: CreateRechargeDto,
  // ) {
  //   return this.transactionService.createRechargeTransaction(userId, {
  //     money: dto.money,
  //     content: dto.content,
  //     image: dto.image,
  //     userBank: {
  //       userBankId: dto.userBankId,
  //       bankName: dto.bankName,
  //       accountName: dto.accountName,
  //       accountNumber: dto.accountNumber,
  //     },
  //     method: TransactionMethodEnum.tranfer,
  //   });
  // }
  @Post('recharge')
  async initiateTopup(
    @Body() body: { amount: number; method: string },
    @Headers('authorization-userid') userId: string,
  ) {
    return this.transactionService.initiateTopup(body, userId);
  }
  @Post('recharge/confirm')
  async confirmBankTransfer(
    @Body() dto: ConfirmBankTransferDto, // Lấy dữ liệu từ request body
    @Headers('authorization-userid') userId: string,
  ) {
    const result = await this.transactionService.confirmBankTransfer(
      dto,
      userId,
    );
    return result;
  }
  @Get('vnpay/callback')
  @HttpCode(200)
  async vnpayCallback(@Query() query: any) {
    const transactionId = query.txnRef || query.transactionId;
    const status = query.responseCode === '00' ? 'success' : 'failed';

    await this.transactionService.confirmPayment(transactionId, status);

    return {
      message: 'VNPAY callback received',
      transactionId,
      status,
    };
  }

  /**
   * Webhook xác nhận thanh toán từ MOMO
   */
  @Post('momo/callback')
  @HttpCode(200)
  async momoCallback(@Body() body: any) {
    const transactionId = body.orderId || body.transactionId;
    const status = body.resultCode === 0 ? 'success' : 'failed';

    await this.transactionService.confirmPayment(transactionId, status);

    return {
      message: 'MOMO callback received',
      transactionId,
      status,
    };
  }

  /**
   * Endpoint dùng để redirect sau khi thanh toán thành công/thất bại
   */
  @Get('payment/result')
  async paymentResult(@Query() query: any) {
    const transactionId = query.transactionId;
    const status = query.status;

    return {
      message: `Thanh toán ${status === 'success' ? 'thành công' : 'thất bại'}`,
      transactionId,
      status,
    };
  }
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: { status: TransactionStatusEnum },
  ) {
    return this.transactionService.updateTransactionStatus(id, dto.status);
  }
  @Get('history')
  async getHistory(@Headers('authorization-userid') userId: string) {
    return this.transactionService.findManyBy({
      $or: [{ userTo: userId }, { userFrom: userId }],
    });
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateTransactionDto,
  ): Promise<any> {
    const result = await this.transactionService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.transactionService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.transactionService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.transactionService.paginate(query);
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams() query: AqpDto,
  ): Promise<any> {
    return this.transactionService.findOneById(id, {
      populate: query.population,
    });
  }
}
