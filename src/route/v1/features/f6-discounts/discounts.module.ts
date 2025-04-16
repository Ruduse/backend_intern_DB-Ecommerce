import NotificationModule from '@common/c12-notification/notification.module';
import NotificationService from '@common/c12-notification/notification.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ShopModule from '../f3-shop/shop.module';
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
    NotificationModule,
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService, DiscountsRepository, NotificationService],
  exports: [DiscountsService, DiscountsRepository],
})
export default class DiscountsModule {}
