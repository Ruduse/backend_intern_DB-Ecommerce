import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DiscountDocument } from './schemas/discounts.schema';
import DiscountsRepository from './discounts.repository';

@Injectable()
export default class DiscountsService extends BaseService<DiscountDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: DiscountsRepository,
  ) {
    super(logger, testRepository);
  }
}
