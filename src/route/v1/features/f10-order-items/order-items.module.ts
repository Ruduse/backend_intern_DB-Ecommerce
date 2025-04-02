import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ProductsModule from '../f4-products/products.module';
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
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
  exports: [OrderItemsService, OrderItemsRepository],
})
export default class OrderItemsModule {}
