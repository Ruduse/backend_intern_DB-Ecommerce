// import BaseService from '@base-inherit/base.service';
// import CustomLoggerService from '@lazy-module/logger/logger.service';
// import { BadRequestException, Injectable } from '@nestjs/common';
// import { Types } from 'mongoose';
// import CartsRepository from './carts.repository';
// import AddToCartDto from './dto/add-to-carts.dto';
// import { CartItem } from './schemas/cart-item.schema';
// import { CartDocument } from './schemas/carts.schema';
// import ProductsService from '../f4-products/products.service';
// import ProductsRepository from '../f4-products/products.repository';

// @Injectable()
// export default class CartsService extends BaseService<CartDocument> {
//   constructor(
//     readonly logger: CustomLoggerService,
//     readonly cartsRepository: CartsRepository,
//     readonly productRepository: ProductsRepository,
//   ) {
//     super(logger, cartsRepository);
//   }

//   async addToCart(
//     userId: string,
//     { productId, skuId, quantity }: AddToCartDto,
//   ) {
//     let cart = await this.cartsRepository.findOneBy({
//       userId: new Types.ObjectId(userId),
//     });

//     if (!cart) {
//       cart = await this.cartsRepository.create({
//         userId: new Types.ObjectId(userId),
//         items: [
//           {
//             productId: new Types.ObjectId(productId),
//             skuId: new Types.ObjectId(skuId),
//             quantity,
//           },
//         ],
//       });
//     } else {
//       const existingItem = cart.items.find(
//         (item: CartItem) =>
//           item.productId.toString() === productId &&
//           item.skuId.toString() === skuId,
//       );

//       if (existingItem) {
//         throw new BadRequestException('Sản phẩm đã có trong giỏ hàng');
//       }

//       cart.items.push({
//         productId: new Types.ObjectId(productId),
//         skuId: new Types.ObjectId(skuId),
//         quantity,
//       });

//       await this.cartsRepository.updateOneBy(cart._id, { items: cart.items });
//     }

//     return cart;
//   }

//   async getCart(userId: string) {
//     return this.cartsRepository.findOneBy({
//       userId: new Types.ObjectId(userId),
//     });
//   }

//   //Xóa sản phẩm trong giỏ hàng
//   async removeCartItem(userId: string, skuId: string) {
//     const cart = await this.cartsRepository.findOneBy({
//       userId: new Types.ObjectId(userId),
//     });
//     if (!cart) {
//       throw new BadRequestException('Giỏ hàng trống');
//     }
//   // Lọc ra những sản phẩm không trùng với skuId cần xóa

//     cart.items = cart.items.filter(
//       (item: CartItem) => item.skuId.toString() !== skuId,
//     );
//     // Nếu giỏ hàng rỗng sau khi xóa thì báo lỗi
//     if (cart.items.length === 0) {
//       throw new BadRequestException('Giỏ hàng trống sau khi xóa sản phẩm');
//     }
//     await this.cartsRepository.updateOneBy(cart._id, { items: cart.items });

//     return cart;
//   }
// }
//   async totalPrice(userId: string) {
//     // Tìm giỏ hàng của user
//     const cart = await this.cartsRepository.findOneBy({
//       userId: new Types.ObjectId(userId),
//     });

//     // Kiểm tra giỏ hàng có rỗng không
//     if (!cart || cart.items.length === 0) {
//       throw new BadRequestException('Giỏ hàng trống');
//     }

//     // Lấy danh sách productId từ giỏ hàng
//     const productIds = cart.items.map((item: CartItem) => new Types.ObjectId(item.productId));

//     // Tìm giá sản phẩm từ ProductRepository
//     const products = await this.productRepository.findManyBy({
//       _id: { $in: productIds },
//     });

//     // Tạo Map để truy xuất giá nhanh
//     const priceMap = new Map();
//     products.forEach((product) => {
//       priceMap.set(product._id.toString(), product.price);
//     });

//     // Tính tổng tiền
//     let totalPrice = 0;
//     cart.items.forEach((item) => {
//       const price = priceMap.get(item.productId.toString()) || 0;
//       totalPrice += item.quantity * price;
//     });

//     return {
//       userId: cart.userId,
//       totalPrice,
//       currency: 'VND', // Hoặc lấy từ DB nếu cần
//     };
//   }
import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import SkuRepository from '../f5-skus/skus.repository';
import CartsRepository from './carts.repository';
import AddToCartDto from './dto/add-to-carts.dto';
import { CartItem } from './schemas/cart-item.schema';
import { CartDocument } from './schemas/carts.schema';

@Injectable()
export default class CartsService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartsRepository: CartsRepository,
    readonly skuRepository: SkuRepository,
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

    // Lọc ra những sản phẩm không trùng với skuId cần xóa
    cart.items = cart.items.filter(
      (item: CartItem) => item.skuId.toString() !== skuId,
    );

    if (cart.items.length === 0) {
      // Nếu không còn sản phẩm, xóa luôn giỏ hàng
      await this.cartsRepository.deleteOneBy(cart._id);
      return { message: 'Giỏ hàng đã bị xóa' };
    }

    await this.cartsRepository.updateOneBy(cart._id, { items: cart.items });

    return cart;
  }

  async totalPrice(userId: string) {
    const cart = await this.cartsRepository.findOneBy({
      userId: new Types.ObjectId(userId),
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    const skuIds = cart.items.map(
      (item: CartItem) => new Types.ObjectId(item.skuId),
    );

    // Tìm giá sản phẩm từ Skus Repository
    const skus = await this.skuRepository.findManyBy({
      _id: { $in: skuIds },
    });

    // Tạo Map để truy xuất giá nhanh
    const priceMap = new Map();
    skus.forEach((sku: any) => {
      priceMap.set(sku._id.toString(), sku.price);
    });

    // Tính tổng tiền
    let totalPrice = 0;
    cart.items.forEach((item: CartItem) => {
      const price = priceMap.get(item.skuId.toString()) || 0;
      totalPrice += item.quantity * price;
    });

    return {
      userId: cart.userId,
      totalPrice,
      currency: 'VND',
    };
  }
}
