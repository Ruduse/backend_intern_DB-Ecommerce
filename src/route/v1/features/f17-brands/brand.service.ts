import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import BrandRepository from './brand.repository';
import { BrandDocument } from './schemas/brand.schema';

@Injectable()
export default class BrandService extends BaseService<BrandDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly brandRepository: BrandRepository,
  ) {
    super(logger, brandRepository);
  }
}
