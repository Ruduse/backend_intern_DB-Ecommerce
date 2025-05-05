import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ProductsModule from '../f4-products/products.module';
import SkusModule from '../f5-skus/skus.module';
import DiscountsModule from '../f6-discounts/discounts.module';
import OrderItemsController from './order-items.controller';
import OrderItemsRepository from './order-items.repository';
import OrderItemsService from './order-items.service';
import { OrderItem, OrderItemsSchema } from './schemas/order-items.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderItem.name,
        schema: OrderItemsSchema,
      },
    ]),
    ProductsModule,
    SkusModule,
    DiscountsModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
  exports: [OrderItemsService, OrderItemsRepository],
})
export default class OrderItemsModule {}
