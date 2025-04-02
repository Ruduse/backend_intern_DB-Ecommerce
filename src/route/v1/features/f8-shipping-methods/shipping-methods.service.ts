import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ShippingMethodDocument } from './schemas/shipping-methods.schema';
import ShippingMethodsRepository from './shipping-methods.repository';

@Injectable()
export default class ShippingMethodsService extends BaseService<ShippingMethodDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly shippingmethodRepository: ShippingMethodsRepository,
  ) {
    super(logger, shippingmethodRepository);
  }
}
