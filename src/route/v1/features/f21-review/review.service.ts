import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
// import { status } from '../../f9-orders/enums/status';
import OrderItemsRepository from '../f10-order-items/order-items.repository';
import ProductsRepository from '../f4-products/products.repository';
import SkuRepository from '../f5-skus/skus.repository';
import { status } from '../f9-orders/enums/status';
import OrdersRepository from '../f9-orders/orders.repository';
import { CreateReviewDetailDto } from './dto/create-review-detail.dto';
import ReviewRepository from './review.repository';
import { ReviewDocument } from './schemas/review.schema';

@Injectable()
export default class ReviewService extends BaseService<ReviewDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly reviewRepository: ReviewRepository,
    readonly orderItemsRepository: OrderItemsRepository,
    readonly ordersRepository: OrdersRepository,
    readonly productRepository: ProductsRepository,
    readonly skuRepository: SkuRepository,
  ) {
    super(logger, reviewRepository);
  } // tạo đánh giá đơn hàng sau khi đơn hàng được giao đến
  async createReview(
    userId: string,
    orderId: string,
    dto: CreateReviewDetailDto,
  ) {
    const order = await this.ordersRepository.findOneBy({
      _id: new Types.ObjectId(orderId),
      orderBy: userId,
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    if (order.status !== status.success) {
      throw new ForbiddenException('Chỉ có thể đánh giá đơn hàng đã giao');
    }

    const orderItem = await this.orderItemsRepository.findOneBy({
      _id: dto.orderItemId,
      orderId: order._id,
    });

    if (!orderItem) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong đơn hàng');
    }

    const existingReview = await this.reviewRepository.findOneBy({
      userId,
      orderItemId: dto.orderItemId,
    });

    if (existingReview) {
      throw new ForbiddenException('Bạn đã đánh giá sản phẩm này rồi');
    }
    //kiểm tra số lượng hình ảnh,video đã sử dụng
    const imageUsed = existingReview?.images?.length || 0;
    const videoUsed = existingReview?.video?.length || 0;

    const maxImages = 5;
    const maxVideos = 1;

    const imagesRemaining = maxImages - imageUsed;
    const videosRemaining = maxVideos - videoUsed;
    //kiểm tra số lượng hình ảnh k quá 5
    if (dto.images && dto.images.length > imagesRemaining) {
      throw new ForbiddenException(`k được thêm quá ${imagesRemaining}`);
    }
    if (dto.video && dto.video.length > videosRemaining) {
      throw new ForbiddenException(`k được thêm quá ${videosRemaining}`);
    }
    const product = await this.productRepository.findOneBy({
      _id: orderItem.productId,
    });
    const sku = await this.skuRepository.findOneBy({
      _id: orderItem.skuId,
    });
    const data = {
      productName: product?.name || '',
      skuAttributes: sku?.attributes || [],
      skuName: sku?.skuCode || '',
      thumbnail: sku?.thumbnail || '',
    };

    const reviewData = {
      ...dto,
      customerId: userId,
      productId: orderItem.productId,
      skuId: orderItem.skuId,
      orderId: order._id,
      data,
      rating: dto.rating || 4,
      images: dto.images || [],
      imagesRemaining: imagesRemaining,
      videoRemaining: videosRemaining,
      video: dto.video || '',
      createdAt: new Date(),
    };
    const createdReview = await this.reviewRepository.create(reviewData);
    await this.orderItemsRepository.updateOneById(
      {
        _id: orderItem._id,
      },
      {
        $set: { reviewId: createdReview._id },
      },
    );
    await this.ordersRepository.updateOneById(
      {
        _id: order._id,
      },
      {
        $addToSet: { reviewId: createdReview._id },
      },
    );
    // Kiểm tra nếu tất cả orderItems đã có reviewId → set isReviewed: true

    const allOrderItems = await this.orderItemsRepository.findManyBy({
      orderId: order._id,
    });
    const allReviewed = allOrderItems.every(
      (item: { reviewId?: string }) => item.reviewId,
    );
    if (allReviewed) {
      await this.ordersRepository.updateOneById(
        { _id: order._id },
        { $set: { isReviewed: true } },
      );
    }
    return {
      reviewData,
      saved: createdReview,
      message: 'Tạo đánh giá thành công',
      reviewId: createdReview._id,
    };
  }
}
