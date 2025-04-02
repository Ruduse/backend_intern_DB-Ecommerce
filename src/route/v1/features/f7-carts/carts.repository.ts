import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Cart, CartDocument } from './schemas/carts.schema';

@Injectable()
export default class CartsRepository extends BaseRepository<CartDocument> {
  constructor(
    @InjectModel(Cart.name) model: PaginateModel<CartDocument>,
  ) {
    super(model);
  }
}
