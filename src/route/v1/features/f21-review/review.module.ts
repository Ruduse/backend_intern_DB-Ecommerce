import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OrderItemsModule from '../f10-order-items/order-items.module';
import ProductsModule from '../f4-products/products.module';
import SkusModule from '../f5-skus/skus.module';
import OrdersModule from '../f9-orders/orders.module';
import ReviewController from './review.controller';
import ReviewRepository from './review.repository';
import ReviewService from './review.service';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
    OrderItemsModule,
    OrdersModule,
    ProductsModule,
    SkusModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService, ReviewRepository],
})
export default class ReviewModule {}
