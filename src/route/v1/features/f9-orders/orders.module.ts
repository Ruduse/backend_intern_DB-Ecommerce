import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OrderItemsModule from '../f10-order-items/order-items.module';
import ReviewModule from '../f21-review/review.module';
import ShopModule from '../f3-shop/shop.module';
import DiscountsModule from '../f6-discounts/discounts.module';
import ShippingMethodsModule from '../f8-shipping-methods/shipping-methods.module';
import OrdersController from './orders.controller';
import OrdersRepository from './orders.repository';
import OrdersService from './orders.service';
import { Order, OrderSchema } from './schemas/orders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ShopModule,
    DiscountsModule,
    ShippingMethodsModule,
    OrderItemsModule,
    ReviewModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, OrdersRepository],
})
export default class OrdersModule {}
