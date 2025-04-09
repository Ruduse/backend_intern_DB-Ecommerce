import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import BankRepository from './bank.repository';
import { BankDocument } from './schemas/bank.schema';

@Injectable()
export default class BankService extends BaseService<BankDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly bankRepository: BankRepository,
  ) {
    super(logger, bankRepository);
  }
}
