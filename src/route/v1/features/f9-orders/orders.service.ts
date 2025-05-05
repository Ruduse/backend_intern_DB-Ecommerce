import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import OrderItemsRepository from '../f10-order-items/order-items.repository';

import NotificationService from '@common/c12-notification/notification.service';
import { RoleEnum, UserRoleEnum } from '@enum/role-user.enum';
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
import { getStatusDisplay } from './helpers/order-status.helper';
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
    private readonly skuRepository: SkuRepository,
    private readonly notificationService: NotificationService, // Đảm bảo đã inject đúng SkuRepository
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
      orderId: order.getId(),
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

  // Hủy đơn hàng
  async cancelOrder(
    userId: string,
    orderId: string,
    user: { UserRole: UserRoleEnum; role: RoleEnum },
  ): Promise<Order> {
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

    const isAdmin =
      user.UserRole === UserRoleEnum.Admin || user.role === RoleEnum.manager; // Kiểm tra nếu là admin
    const cancelReason = isAdmin
      ? 'Admin hủy đơn hàng'
      : 'Người dùng hủy đơn hàng';
    // Cập nhật lịch sử trạng thái
    const statusHistoryEntry = {
      status: status.cancel,
      changedAt: new Date(),
      changedBy: isAdmin ? 'Admin' : userId, // Ghi lại ai thay đổi
      changeReason: cancelReason, // Lý do thay đổi
    };
    const updated = {
      status: status.cancel,
      updatedAt: new Date(),
      canceledBy: isAdmin ? 'Admin' : userId, // Ghi lại ai hủy
      cancelReason,
      canceledAt: new Date(),
      statusHistories: [
        ...(Array.isArray(order.statusHistories) ? order.statusHistories : []),
        statusHistoryEntry,
      ],
      // Thêm vào lịch sử trạng thái
    };

    this.logger.log('Hủy đơn hàng', {
      orderId,
      oldStatus: order.status,
      canceledBy: updated.canceledBy,
      cancelReason: updated.cancelReason,
    });

    // Cập nhật lịch sử trạng thái và trạng thái đơn hàng
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
      orderId: order.getId(), // Use a public getter method to access the ID
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
      orderId: order.getId(),
      createdAt: new Date(),
    };

    return this.reviewsRepository.create(reviewData);
  }
  // Lấy danh sách đơn hàng của người dùng với phân trang
  async paginate(
    query: AqpDto,
    userId?: string,
  ): Promise<{
    results: Array<{ order: Order; items: any[] }>;
    page: number;
    limit: number;
  }> {
    const { filter = {}, page = 1, limit = 10, status } = query;
    filter.orderBy = userId;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const orders = await this.ordersRepository.findManyBy(filter, {
      skip,
      limit,
    });
    if (!orders.length) return { results: [], page, limit };

    // Với mỗi order, lấy orderItems và ép thành shape:
    const results = await Promise.all(
      orders.map(async (order: any) => {
        const orderItems = await this.orderItemsRepository.findManyBy({
          orderId: order._id,
        });
        const items = orderItems.map(
          (item: {
            productId: any;
            skuId: any;
            quantity: any;
            totalAmount: any;
          }) => ({
            productId: item.productId,
            skuId: item.skuId,
            quantity: item.quantity,
            totalAmount: item.totalAmount,
          }),
        );
        return { order, items };
      }),
    );

    return { results, page, limit };
  }
  async updateStatus(
    user: { UserRole: UserRoleEnum; role: RoleEnum },
    userId: string,
    orderId: string,
    newStatus: status,
    reason?: string,
  ): Promise<Order> {
    // 1. Lấy order, check quyền (admin hoặc owner)
    const order = await this.ordersRepository.findOneBy({ _id: orderId });
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');

    // Nếu không phải admin, chỉ owner mới được update
    const isAdmin =
      user.UserRole === UserRoleEnum.Admin || user.role === RoleEnum.manager;
    if (!isAdmin && order.orderBy.toString() !== userId) {
      throw new ForbiddenException('Không có quyền cập nhật trạng thái');
    }

    // 2. Tạo history entry
    const entry = {
      status: newStatus,
      changedAt: new Date(),
      changedBy: isAdmin ? 'Admin' : userId,
      changeReason: reason || '',
    };

    // 3. Cập nhật
    const updated = await this.ordersRepository.updateOneById(orderId, {
      status: newStatus,
      updatedAt: new Date(),
      statusHistories: [...(order.statusHistories || []), entry],
    });

    // 4. Gửi notification
    const message =
      `Đơn hàng ${order.code} đã chuyển sang trạng thái ${newStatus}` +
      (reason ? ` (Lý do: ${reason})` : '');
    await this.notificationService.sendOrderUpdate(orderId.toString(), message);

    return updated;
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

    const orderItems = await this.orderItemsRepository.findWithPopulate({
      orderId: order._id,
    });

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong đơn hàng');
    }
    const productList = orderItems.map((item) => {
      const product = item.productId as unknown as Product; // Đảm bảo rằng productId là một Product
      const sku = item.skuId as unknown as Sku; // Đảm bảo rằng skuId là một Sku

      return {
        product: {
          name: product?.name || '', // Lấy name của product
          thumbnail: sku?.thumbnail || '', // Lấy thumbnail của sku
          price: sku?.basePrice || 0, // Lấy price của sku
          quantity: item.quantity,
        },
        totalAmount: item.totalAmount,
      };
    });
    const totalProducts = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return {
      statusDisplay: getStatusDisplay(order.status, order.shippingInfo.toDate),
      address: {
        contactName: order.contact.contactName,
        contactPhone: order.contact.contactPhone,
        fullAddress: order.addressFull,
        street: order.street,
        villageId: order.villageId,
        districtId: order.districtId,
        provinceId: order.provinceId,
      },
      totalProducts,
      // status: order.status,
      products: productList,
      totalAmount: order.checkout.totalAmount,
      shippingInfo: order.shippingInfo,
      note: order.contact.note,
      orderId: order._id,
      orderTime: order.createdAt,
      checkoutTime: order.createdAt,
      shippingTime: order.createdAt,
    };
  }
}
