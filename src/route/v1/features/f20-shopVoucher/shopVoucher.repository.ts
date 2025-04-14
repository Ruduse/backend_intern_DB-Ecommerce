import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { shopVoucher, ShopVoucherDocument } from './schemas/shopVoucher.schema';

@Injectable()
export default class ShopVoucherRepository extends BaseRepository<ShopVoucherDocument> {
  constructor(
    @InjectModel(shopVoucher.name) model: PaginateModel<ShopVoucherDocument>,
  ) {
    super(model);
  }
}
