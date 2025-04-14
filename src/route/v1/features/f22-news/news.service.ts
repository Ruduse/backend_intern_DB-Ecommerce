import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import NewsRepository from './news.repository';
import { NewsDocument } from './schemas/news.schema';

@Injectable()
export default class NewsService extends BaseService<NewsDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly newsRepository: NewsRepository,
  ) {
    super(logger, newsRepository);
  }
}
