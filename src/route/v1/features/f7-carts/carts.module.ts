import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  exports: [CartsService, CartsRepository],
})
export default class CartsModule {}
