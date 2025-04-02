import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import OrdersRepository from './orders.repository';
import { OrderDocument } from './schemas/orders.schema';

@Injectable()
export default class OrdersService extends BaseService<OrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: OrdersRepository,
  ) {
    super(logger, testRepository);
  }
}
