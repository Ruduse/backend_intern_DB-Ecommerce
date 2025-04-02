import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
  ShippingMethod,
  ShippingMethodDocument,
} from './schemas/shipping-methods.schema';

@Injectable()
export default class ShippingMethodsRepository extends BaseRepository<ShippingMethodDocument> {
  constructor(
    @InjectModel(ShippingMethod.name)
    model: PaginateModel<ShippingMethodDocument>,
  ) {
    super(model);
  }
}
