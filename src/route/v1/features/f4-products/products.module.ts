import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ShopModule from '../f2-shop/shop.module';
import CategoriesModule from '../f3-categories/categories.module';
import ProductsController from './products.controller';
import ProductsRepository from './products.repository';
import ProductsService from './products.service';
import { Product, ProductsSchema } from './schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductsSchema,
      },
    ]),
    ShopModule, // Đảm bảo NestJS biết về Shop Schema
    CategoriesModule, // Đảm bảo NestJS biết về Category Schema
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
})
export default class ProductsModule {}
