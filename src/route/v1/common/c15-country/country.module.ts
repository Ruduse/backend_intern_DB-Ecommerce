import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CountryController from './country.controller';
import CountryRepository from './country.repository';
import CountryService from './country.service';
import { Country, CountrySchema } from './schemas/country.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Country.name,
        useFactory: () => {
          const schema = CountrySchema;

          // eslint-disable-next-line
          schema.plugin(require('mongoose-slug-updater'));

          return schema;
        },
      },
    ]),
  ],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository],
  exports: [CountryService, CountryRepository],
})
export default class CountryModule {}
