import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FlashSaleController from './flashSale.controller';
import FlashSaleRepository from './flashSale.repository';
import FlashSaleService from './flashSale.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlashSaleModule.name,
        schema: FlashSaleService,
      },
    ]),
  ],
  controllers: [FlashSaleController],
  providers: [FlashSaleService, FlashSaleRepository],
  exports: [FlashSaleService, FlashSaleRepository],
})
export default class FlashSaleModule {}
