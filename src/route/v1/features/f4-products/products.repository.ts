import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';

@Injectable()
export default class ProductsRepository extends BaseRepository<ProductsDocument> {
  constructor(
    @InjectModel(Products.name) model: PaginateModel<ProductsDocument>,
  ) {
    super(model);
  }
}
