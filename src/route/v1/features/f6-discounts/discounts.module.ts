import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ShopModule from '../f2-shop/shop.module';
import DiscountsController from './discounts.controller';
import DiscountsRepository from './discounts.repository';
import DiscountsService from './discounts.service';
import { Discount, DiscountsSchema } from './schemas/discounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Discount.name,
        schema: DiscountsSchema,
      },
    ]),
    ShopModule,
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService, DiscountsRepository],
  exports: [DiscountsService, DiscountsRepository],
})
export default class DiscountsModule {}
