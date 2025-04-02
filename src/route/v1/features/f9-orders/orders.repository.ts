import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Order, OrderDocument } from './schemas/orders.schema';

@Injectable()
export default class OrdersRepository extends BaseRepository<OrderDocument> {
  constructor(@InjectModel(Order.name) model: PaginateModel<OrderDocument>) {
    super(model);
  }
}
