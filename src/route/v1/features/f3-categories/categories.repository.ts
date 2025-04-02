import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CategoriesDocument, Category } from './schemas/categories.schema';

@Injectable()
export default class CategoriesRepository extends BaseRepository<CategoriesDocument> {
  constructor(
    @InjectModel(Category.name) model: PaginateModel<CategoriesDocument>,
  ) {
    super(model);
  }
}
