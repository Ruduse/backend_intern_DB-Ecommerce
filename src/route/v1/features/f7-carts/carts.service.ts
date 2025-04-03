import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import CartsRepository from './carts.repository';
import AddToCartDto from './dto/add-to-carts.dto';
import { CartItem } from './schemas/cart-item.schema';
import { CartDocument } from './schemas/carts.schema';

@Injectable()
export default class CartsService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartsRepository: CartsRepository,
  ) {
    super(logger, cartsRepository);
  }

  async addToCart(
    userId: string,
    { productId, skuId, quantity }: AddToCartDto,
  ) {
    let cart = await this.cartsRepository.findOneBy({
      userId: new Types.ObjectId(userId),
    });

    if (!cart) {
      cart = await this.cartsRepository.create({
        userId: new Types.ObjectId(userId),
        items: [
          {
            productId: new Types.ObjectId(productId),
            skuId: new Types.ObjectId(skuId),
            quantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item: CartItem) =>
          item.productId.toString() === productId &&
          item.skuId.toString() === skuId,
      );

      if (existingItem) {
        throw new BadRequestException('Sản phẩm đã có trong giỏ hàng');
      }

      cart.items.push({
        productId: new Types.ObjectId(productId),
        skuId: new Types.ObjectId(skuId),
        quantity,
      });

      await this.cartsRepository.updateOneBy(cart._id, { items: cart.items });
    }

    return cart;
  }

  async getCart(userId: string) {
    return this.cartsRepository.findOneBy({
      userId: new Types.ObjectId(userId),
    });
  }

  async removeCartItem(userId: string, skuId: string) {
    const cart = await this.cartsRepository.findOneBy({
      userId: new Types.ObjectId(userId),
    });
    if (!cart) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    cart.items = cart.items.filter(
      (item: CartItem) => item.skuId.toString() !== skuId,
    );
    await this.cartsRepository.updateOneBy(cart._id, { items: cart.items });

    return cart;
  }
}
