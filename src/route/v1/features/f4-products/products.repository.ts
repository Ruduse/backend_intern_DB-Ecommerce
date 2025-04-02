import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Product, ProductsDocument } from './schemas/products.schema';

@Injectable()
export default class ProductsRepository extends BaseRepository<ProductsDocument> {
  constructor(
    @InjectModel(Product.name) model: PaginateModel<ProductsDocument>,
  ) {
    super(model);
  }
}
