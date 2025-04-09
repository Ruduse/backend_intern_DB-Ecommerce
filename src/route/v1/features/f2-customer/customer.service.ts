import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CustomerRepository from './customer.repository';
import { CustomerDocument } from './schemas/customer.schema';

@Injectable()
export default class CustomerService extends BaseService<CustomerDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: CustomerRepository,
  ) {
    super(logger, testRepository);
  }
}
