import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ProductsModule from '../f4-products/products.module';
import SkusModule from '../f5-skus/skus.module';
import CartsController from './carts.controller';
import CartsRepository from './carts.repository';
import CartsService from './carts.service';
import { Cart, CartsSchema } from './schemas/carts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartsSchema,
      },
    ]),
    ProductsModule,
    SkusModule,
  ],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  exports: [CartsService, CartsRepository],
})
export default class CartsModule {}
