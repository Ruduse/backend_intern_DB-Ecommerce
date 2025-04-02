import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ShopModule from '../f2-shop/shop.module';
import DiscountsModule from '../f6-discounts/discounts.module';
import ShippingMethodsModule from '../f8-shipping-methods/shipping-methods.module';
import OrdersController from './orders.controller';
import OrdersRepository from './orders.repository';
import OrdersService from './orders.service';
import { Order, OrdersSchema } from './schemas/orders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrdersSchema,
      },
    ]),
    ShopModule,
    DiscountsModule,
    ShippingMethodsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, OrdersRepository],
})
export default class OrdersModule {}
