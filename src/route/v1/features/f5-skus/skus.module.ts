import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sku, SkuSchema } from './schemas/skus.schema';
import SkuController from './skus.controller';
import SkuRepository from './skus.repository';
import SkuService from './skus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sku.name,
        schema: SkuSchema,
      },
    ]),
  ],
  controllers: [SkuController],
  providers: [SkuService, SkuRepository],
  exports: [SkuService, SkuRepository],
})
export default class SkusModule {}
