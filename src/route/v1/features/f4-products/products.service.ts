import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import ProductsRepository from './products.repository';
import { ProductsDocument } from './schemas/products.schema';

@Injectable()
export default class ProductsService extends BaseService<ProductsDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: ProductsRepository,
  ) {
    super(logger, testRepository);
  }
}
