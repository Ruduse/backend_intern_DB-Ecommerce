import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export default class TransactionRepository extends BaseRepository<TransactionDocument> {
  private transactionModel;

  constructor(
    @InjectModel(Transaction.name) model: PaginateModel<TransactionDocument>,
  ) {
    super(model);
    this.transactionModel = model;
  }

  /**
   * Create transactions
   *
   * @param item
   * @returns
   */
  async createMany(item: any[]) {
    return this.transactionModel.create(item);
  }
  async sumMoney(filter: Record<string, any>): Promise<number> {
    const result = await this.transactionModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          total: { $sum: '$money' },
        },
      },
    ]);

    return result[0]?.total || 0;
  }
}
