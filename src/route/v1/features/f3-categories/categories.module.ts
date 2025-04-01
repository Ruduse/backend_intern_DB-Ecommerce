import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CategoriesController from './categories.controller';
import CategoriesRepository from './categories.repository';
import CategoriesService from './categories.service';
import { Categories, CategoriesSchema } from './schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categories.name,
        schema: CategoriesSchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export default class CategoriesModule {}
