import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BrandController from './brand.controller';
import BrandRepository from './brand.repository';
import BrandService from './brand.service';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService, BrandRepository],
})
export default class BrandModule {}
