import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';

@Injectable()
export default class NewsRepository extends BaseRepository<NewsDocument> {
  constructor(@InjectModel(News.name) model: PaginateModel<NewsDocument>) {
    super(model);
  }
}
