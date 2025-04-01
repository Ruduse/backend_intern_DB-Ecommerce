import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';

@Injectable()
export default class CountryRepository extends BaseRepository<CountryDocument> {
  constructor(
    @InjectModel(Country.name) model: PaginateModel<CountryDocument>,
  ) {
    super(model);
  }
}
