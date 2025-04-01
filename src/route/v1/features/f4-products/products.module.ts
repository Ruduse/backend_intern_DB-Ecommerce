import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ProductsController from './products.controller';
import ProductsRepository from './products.repository';
import ProductsService from './products.service';
import { Products, ProductsSchema } from './schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
})
export default class ProductsModule {}
