import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CategoriesRepository from './categories.repository';
import { CategoriesDocument } from './schemas/categories.schema';

@Injectable()
export default class CategoriesService extends BaseService<CategoriesDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: CategoriesRepository,
  ) {
    super(logger, testRepository);
  }
}
