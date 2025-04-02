import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CartsRepository from './carts.repository';
import { CartDocument } from './schemas/carts.schema';

@Injectable()
export default class CartsService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: CartsRepository,
  ) {
    super(logger, testRepository);
  }
}
