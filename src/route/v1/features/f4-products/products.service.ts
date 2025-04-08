import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchProductDto } from './dto/search-products.dto';
import ProductsRepository from './products.repository';
import { ProductsDocument } from './schemas/products.schema';

@Injectable()
export default class ProductsService extends BaseService<ProductsDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly productsRepository: ProductsRepository,
  ) {
    super(logger, productsRepository);
  }

  async searchProducts(searchDto: SearchProductDto) {
    const { name, categoryId, minPrice, maxPrice } = searchDto;

    const filter: any = { isActive: true }; // chỉ tìm sản phẩm đang hoạt động

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Tìm theo tên (không phân biệt hoa thường)
    }
    if (categoryId) {
      filter.categoryId = categoryId; // Tìm theo category
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) {
        filter.price.$gte;
        if (maxPrice !== undefined) {
          filter.price.$lte = maxPrice; // Giá tối đa
        }
      }

      this.logger.debug('Searching products with filter:', filter);

      return this.productsRepository.findManyBy(filter); // tìm nhiều sản phẩm theo filter
    }
  }

  async getProductById(productId: string) {
    const product = await this.productsRepository.findOneById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
