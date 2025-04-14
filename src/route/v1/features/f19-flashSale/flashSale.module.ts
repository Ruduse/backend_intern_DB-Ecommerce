import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FlashSaleController from './flashSale.controller';
import FlashSaleRepository from './flashSale.repository';
import FlashSaleService from './flashSale.service';
import { FlashSale, FlashSaleSchema } from './schemas/flashSale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlashSale.name,
        schema: FlashSaleSchema,
      },
    ]),
  ],
  controllers: [FlashSaleController],
  providers: [FlashSaleService, FlashSaleRepository],
  exports: [FlashSaleService, FlashSaleRepository],
})
export default class FlashSaleModule {}
