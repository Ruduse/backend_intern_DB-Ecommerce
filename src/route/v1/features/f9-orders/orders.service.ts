import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import OrderItemsRepository from '../f10-order-items/order-items.repository';
import { CreateOrderDto } from './dto/create-orders.dto';
import { GetMyOrdersDto } from './dto/get-my-orders.dto';
import UpdateOrdersDto from './dto/update-orders.dto';
import { status } from './enums/status';
import { mapOrderDetailResponse } from './helpers/order.mapper';
import OrdersRepository from './orders.repository';
import { Order, OrderDocument } from './schemas/orders.schema';
@Injectable()
export default class OrdersService extends BaseService<OrderDocument> {
  [x: string]: any;
  constructor(
    readonly logger: CustomLoggerService,
    readonly ordersRepository: OrdersRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
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

  // Lấy tất cả đơn hàng (không phân biệt người dùng)
  async getAllOrders(dto: GetMyOrdersDto): Promise<Order[]> {
    const filter: any = {};

    if ((dto.status ?? []).length > 0) {
      filter.status = { $in: dto.status };
    }

    return this.ordersRepository.findManyBy(filter);
  }

  // Lấy các đơn hàng của người dùng hiện tại
  async getMyOrders(userId: string, dto: GetMyOrdersDto): Promise<Order[]> {
    const filter: any = { orderBy: userId };

    if (Array.isArray(dto.status) && dto.status.length > 0) {
      filter.status = { $in: dto.status };
    }

    return this.ordersRepository.findManyBy(filter);
  }

  // Lấy chi tiết đơn hàng cụ thể của người dùng
  // async getMyOrderById(userId: string, orderId: string): Promise<Order> {
  //   const order = await this.ordersRepository.findOneBy({
  //     _id: orderId,
  //     orderBy: userId,
  //   });

  //   if (!order) {
  //     this.logger.warn('Không tìm thấy đơn hàng', { userId, orderId });
  //     throw new NotFoundException('Không tìm thấy đơn hàng');
  //   }

  //   return order;
  // }
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

  // Thống kê số lượng đơn hàng theo trạng thái
  async getOrderCounts(userId: string): Promise<Record<status, number>> {
    const counts: Record<status, number> = {
      [status.waiting]: 0,
      [status.confirm]: 0,
      [status.delivery]: 0,
      [status.success]: 0,
      [status.cancel]: 0,
      [status.refund]: 0,
    };

    const aggregationResult = await this.ordersRepository.aggregate([
      { $match: { orderBy: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    aggregationResult.forEach((result: { _id: status; count: number }) => {
      counts[result._id] = result.count;
    });

    return counts;
  }
}
