orderitemsimport { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OrderItemsController from './orderitems.controller';
import OrderItemsRepository from './orderitems.repository';
import OrderItemsService from './orderitems.service';
import { OrderItem, OrderItemsSchema } from './schemas/orderitems.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderItem.name,
        schema: OrderItemsSchema,
      },
    ]),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
  exports: [OrderItemsService, OrderItemsRepository],
})
export default class OrderItemsModule {}
