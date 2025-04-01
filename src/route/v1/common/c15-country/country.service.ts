import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CountryRepository from './country.repository';
import { CountryDocument } from './schemas/country.schema';

@Injectable()
export default class CountryService extends BaseService<CountryDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly countryRepository: CountryRepository,
  ) {
    super(logger, countryRepository);
  }
}
