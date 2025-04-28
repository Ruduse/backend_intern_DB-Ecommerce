import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import OrderItemsRepository from '../f10-order-items/order-items.repository';

import AqpDto from '@interceptor/aqp/aqp.dto';
import { CreateReviewDetailDto } from '../f21-review/dto/create-review-detail.dto';
import ReviewRepository from '../f21-review/review.repository';
import ProductsRepository from '../f4-products/products.repository';
import { Product } from '../f4-products/schemas/products.schema';
import { Sku } from '../f5-skus/schemas/skus.schema';
import SkuRepository from '../f5-skus/skus.repository';
import { CreateOrderDto } from './dto/create-orders.dto';
import { GetMyOrdersDto } from './dto/get-my-orders.dto';
import UpdateOrdersDto from './dto/update-orders.dto';
import { status } from './enums/status';
import { mapOrderDetailResponse } from './helpers/order.mapper';
import OrdersRepository from './orders.repository';
import { Order, OrderDocument } from './schemas/orders.schema';
@Injectable()
export default class OrdersService extends BaseService<OrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly ordersRepository: OrdersRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly reviewsRepository: ReviewRepository,
    private readonly productRepository: ProductsRepository,
    private readonly skuRepository: SkuRepository, // Đảm bảo đã inject đúng SkuRepository
  ) {
    super(logger, ordersRepository);
  }

  // Tạo đơn hàng mới
  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    this.logger.log('Tạo đơn hàng mới', { userId, ...dto });

    const newOrder = {
      ...dto,
      orderBy: userId,
      status: status.waiting,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.ordersRepository.create(newOrder);
  }

  async getAllOrders(dto: GetMyOrdersDto): Promise<Order[]> {
    const filter: any = {};

    if ((dto.status ?? []).length > 0) {
      filter.status = { $in: dto.status };
    }

    return this.ordersRepository.findManyBy(filter);
  }

  // Lấy đơn hàng của người dùng theo orderId
  async getMyOrderById(userId: string, orderId: string) {
    const order = await this.ordersRepository.findOneBy({
      _id: orderId,
      orderBy: userId,
    });

    if (!order) {
      this.logger.warn('Không tìm thấy đơn hàng', { userId, orderId });
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    // Lấy danh sách sản phẩm trong đơn hàng
    const orderItems = await this.orderItemsRepository.find({
      orderId: order._id,
    });

    if (!Array.isArray(orderItems)) {
      this.logger.warn('Danh sách sản phẩm không hợp lệ hoặc không tồn tại', {
        userId,
        orderId,
      });
      throw new NotFoundException('Không tìm thấy sản phẩm trong đơn hàng');
    }

    return mapOrderDetailResponse(order, userId, orderItems);
  }

  // Cập nhật đơn hàng của người dùng
  async updateOrder(
    userId: string,
    orderId: string,
    dto: UpdateOrdersDto,
  ): Promise<Order> {
    await this.getMyOrderById(userId, orderId);

    const updated = {
      ...dto,
      updatedAt: new Date(),
    };

    this.logger.log('Cập nhật đơn hàng', { orderId, ...dto });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(
    userId: string,
    orderId: string,
    orderStatus: status,
  ): Promise<Order> {
    const order = await this.getMyOrderById(userId, orderId);

    const updated = {
      status: orderStatus,
      updatedAt: new Date(),
    };

    this.logger.log('Cập nhật trạng thái đơn hàng', {
      orderId,
      oldStatus: order.status,
      newStatus: orderStatus,
    });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

  // Hủy đơn hàng
  async cancelOrder(userId: string, orderId: string): Promise<Order> {
    const order = await this.getMyOrderById(userId, orderId);
    const allowedStatuses = [status.waiting, status.confirm];

    if (!allowedStatuses.includes(order.status as status)) {
      this.logger.warn('Không thể hủy đơn hàng ở trạng thái hiện tại', {
        orderId,
        status: order.status,
      });
      throw new ForbiddenException(
        'Không thể hủy đơn hàng ở trạng thái hiện tại',
      );
    }

    const updated = {
      status: status.cancel,
      updatedAt: new Date(),
    };

    this.logger.log('Hủy đơn hàng', { orderId, oldStatus: order.status });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

  // Yêu cầu hoàn tiền
  async requestRefund(
    userId: string,
    orderId: string,
    reason: string,
  ): Promise<Order> {
    const order = await this.getMyOrderById(userId, orderId);

    if (order.status !== status.success) {
      this.logger.warn(
        'Chỉ có thể yêu cầu hoàn tiền cho đơn hàng đã giao thành công',
        {
          orderId,
          status: order.status,
        },
      );
      throw new ForbiddenException(
        'Chỉ có thể yêu cầu hoàn tiền cho đơn hàng đã giao thành công',
      );
    }

    const updated = {
      status: status.refund,
      refundReason: reason,
      updatedAt: new Date(),
    };

    this.logger.log('Yêu cầu hoàn tiền', { orderId, reason });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

  // tạo đánh giá đơn hàng sau khi đơn hàng được giao đến
  async createReview(
    userId: string,
    orderId: string,
    dto: CreateReviewDetailDto,
  ) {
    const order = await this.ordersRepository.findOneBy({
      _id: orderId,
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

    const existingReview = await this.reviewsRepository.findOneBy({
      userId,
      orderItemId: dto.orderItemId,
    });

    if (existingReview) {
      throw new ForbiddenException('Bạn đã đánh giá sản phẩm này rồi');
    }

    const reviewData = {
      ...dto,
      userId,
      orderId: order._id,
      createdAt: new Date(),
    };

    return this.reviewsRepository.create(reviewData);
  }

  // Lấy danh sách đơn hàng của người dùng với phân trang
  async paginate(query: AqpDto, userId?: string): Promise<any> {
    const { filter = {}, page = 1, limit = 10, status } = query;

    filter.orderBy = userId;
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    // 1. Lấy danh sách đơn hàng
    const orders = await this.ordersRepository.findManyBy(filter, {
      skip,
      limit,
    });

    if (!orders.length) {
      return {
        // results: [],
        page,
        limit,
        select: ['id', 'orderId', 'status'],
        message: 'Không tìm thấy đơn hàng nào',
      };
    }

    // 2. Lấy tất cả orderId từ orders
    const orderIds = orders.map((order: OrderDocument) => order._id);

    // 3. Lấy tất cả orderItem thuộc các orderId đó
    const orderItems = await this.orderItemsRepository.find({
      orderId: { $in: orderIds },
    });
    // .select('orderId productId');

    // 4. Gom các orderItems theo orderId
    const orderItemsByOrderId = orderItems.reduce((acc, item) => {
      const orderIdStr = item.orderId.toString();
      if (!acc[orderIdStr]) {
        acc[orderIdStr] = [];
      }
      acc[orderIdStr].push(item.productId.toString());
      return acc;
    }, {} as Record<string, string[]>);

    // 5. Lấy tất cả các productId duy nhất
    const allProductIds = [
      ...new Set(orderItems.map((item) => item.productId.toString())),
    ];

    // 6. Query lấy thông tin tất cả products (chỗ này bạn cần inject ProductRepository)
    const products = await this.productRepository.findManyBy({
      _id: { $in: allProductIds },
    });

    // 7. Lấy tất cả SKU liên quan đến các productId
    const skus = await this.skuRepository.findManyBy({
      productId: { $in: allProductIds },
    });
    // Map SKU theo productId
    const skusByProductId = skus.reduce(
      (acc: Record<string, any>, sku: Sku) => {
        acc[sku.productId.toString()] = {
          thumbnail: sku.thumbnail,
          price: sku.basePrice, // Hoặc dùng trường giá khác như originalPrice
        };
        return acc;
      },
      {} as Record<string, any>,
    );

    // Lấy thông tin của products và gắn thông tin SKU vào
    const productsById = products.reduce(
      (acc: Record<string, any>, product: Product) => {
        const sku = skusByProductId[product._id.toString()];
        acc[product._id.toString()] = {
          _id: product._id,
          name: product.name,
          thumbnail: sku?.thumbnail || '',
          price: sku?.price || 0,
        };
        return acc;
      },
      {} as Record<string, any>,
    );
    // 8. Map kết quả cuối cùng
    const results = orders.map((order: OrderDocument) => {
      const productIds = orderItemsByOrderId[order._id.toString()] || [];
      const productList = productIds
        .map((productId) => productsById[productId])
        .filter(Boolean);
      // Nếu order là document (có toObject) thì toObject(), còn không thì xài luôn
      const plainOrder =
        typeof order.toObject === 'function' ? order.toObject() : order;
      return {
        ...plainOrder,
        products: productList,
      };
    });

    return {
      results,
      page,
      limit,
    };
  }

  // Api chi tiết đơn hàng của tôi
  async getMyOrderDetail(query: AqpDto, userId: string, orderId: string) {
    const order = await this.ordersRepository.findOneBy({
      _id: orderId,
      orderBy: userId,
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    // Lấy tất cả orderItems
    const orderItems = await this.orderItemsRepository.find({
      orderId: order._id,
    });

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong đơn hàng');
    }

    const productIds = [
      ...new Set(orderItems.map((item) => item.productId.toString())),
    ];

    // Query products
    const products = await this.productRepository.findManyBy({
      _id: { $in: productIds },
    });

    const skus = await this.skuRepository.findManyBy({
      productId: { $in: productIds },
    });

    const skusByProductId = skus.reduce(
      (acc: Record<string, any>, sku: Sku) => {
        acc[sku.productId.toString()] = sku;
        return acc;
      },
      {} as Record<string, Sku>,
    );

    const productsById = products.reduce(
      (acc: Record<string, any>, product: Product) => {
        acc[product._id.toString()] = product;
        return acc;
      },
      {} as Record<string, Product>,
    );

    const productList = orderItems.map((item) => {
      const product = productsById[item.productId.toString()];
      const sku = skusByProductId[item.productId.toString()];
      return {
        // productId: product._id,
        product: {
          name: product?.name || '',
          thumbnail: sku?.thumbnail || '',
          price: sku?.basePrice || 0,
          quantity: item.quantity,
        },

        totalAmount: item.totalAmount,
      };
    });
    //  Thêm tính tổng số lượng sản phẩm
    const totalProducts = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    return {
      totalProducts,
      status: order.status,
      products: productList,
      totalAmount: order.totalAmount,
      shippingInfo: order.shippingInfo,
      note: order.note,
      orderId: order._id,
      orderTime: order.createdAt,
      checkoutTime: order.creatAt,
      shippingTime: order.createAt,
    };
  }
}
