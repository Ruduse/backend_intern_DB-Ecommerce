import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { SkuDocument } from './schemas/skus.schema';
import SkuRepository from './skus.repository';

@Injectable()
export default class SkuService extends BaseService<SkuDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: SkuRepository,
  ) {
    super(logger, testRepository);
  }
}
