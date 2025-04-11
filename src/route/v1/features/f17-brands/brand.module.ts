import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BrandController from './brand.controller';
import BrandRepository from './brand.repository';
import BrandService from './brand.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BrandModule.name,
        schema: BrandService,
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService, BrandRepository],
})
export default class BrandModule {}
