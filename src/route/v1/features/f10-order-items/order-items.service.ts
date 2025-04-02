import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import OrderItemsRepository from './orderitems.repository';
import { OrderItemDocument } from './schemas/orderitems.schema';

@Injectable()
export default class OrderItemsService extends BaseService<OrderItemDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: OrderItemsRepository,
  ) {
    super(logger, testRepository);
  }
}
