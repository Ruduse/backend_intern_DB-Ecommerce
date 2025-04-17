import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-orders.dto';
import { GetMyOrdersDto } from './dto/get-my-orders.dto';
import UpdateOrdersDto from './dto/update-orders.dto';
import { status } from './enums/status';
import OrdersRepository from './orders.repository';
import { Order, OrderDocument } from './schemas/orders.schema';

@Injectable()
export default class OrdersService extends BaseService<OrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly ordersRepository: OrdersRepository,
  ) {
    super(logger, ordersRepository);
  }

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    this.logger.log('Creating new order', { userId, ...dto });

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

  async getMyOrders(userId: string, dto: GetMyOrdersDto): Promise<Order[]> {
    const filter: any = { orderBy: userId };

    if (Array.isArray(dto.status) && dto.status.length > 0) {
      filter.status = { $in: dto.status };
    }

    return this.ordersRepository.findManyBy(filter);
  }

  async getMyOrderById(userId: string, orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({
      _id: orderId,
      orderBy: userId,
    });

    if (!order) {
      this.logger.warn('Order not found', { userId, orderId });
      throw new NotFoundException('Order not found');
    }

    return order;
  }

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

    this.logger.log('Updating order', { orderId, ...dto });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

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

    this.logger.log('Updating order status', {
      orderId,
      oldStatus: order.status,
      newStatus: orderStatus,
    });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

  async cancelOrder(userId: string, orderId: string): Promise<Order> {
    const order = await this.getMyOrderById(userId, orderId);
    const allowedStatuses = [status.waiting, status.confirm];

    if (!allowedStatuses.includes(order.status as status)) {
      this.logger.warn('Cannot cancel order in current status', {
        orderId,
        status: order.status,
      });
      throw new ForbiddenException('Cannot cancel order in current status');
    }

    const updated = {
      status: status.cancel,
      updatedAt: new Date(),
    };

    this.logger.log('Cancelling order', { orderId, oldStatus: order.status });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

  async requestRefund(
    userId: string,
    orderId: string,
    reason: string,
  ): Promise<Order> {
    const order = await this.getMyOrderById(userId, orderId);

    if (order.status !== status.success) {
      this.logger.warn('Can only request refund for delivered orders', {
        orderId,
        status: order.status,
      });
      throw new ForbiddenException(
        'Can only request refund for delivered orders',
      );
    }

    const updated = {
      status: status.refund,
      refundReason: reason,
      updatedAt: new Date(),
    };

    this.logger.log('Requesting refund', { orderId, reason });

    return this.ordersRepository.updateOneById(orderId, updated);
  }

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
