import NotificationModule from '@common/c12-notification/notification.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OrderItemsModule from '../f10-order-items/order-items.module';
import ReviewModule from '../f21-review/review.module';
import ShopModule from '../f3-shop/shop.module';
import ProductsModule from '../f4-products/products.module';
import SkusModule from '../f5-skus/skus.module';
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
    forwardRef(() => ReviewModule),
    ProductsModule,
    SkusModule,
    NotificationModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, OrdersRepository],
})
export default class OrdersModule {}
