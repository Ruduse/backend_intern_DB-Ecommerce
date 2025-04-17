import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';

import { CreateOrderDto } from './dto/create-orders.dto';
import { GetMyOrdersDto } from './dto/get-my-orders.dto';
import UpdateOrdersDto from './dto/update-orders.dto';
import { status } from './enums/status';
import OrdersService from './orders.service';

@ApiTags('Orders')
@Controller()
export default class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  async createOrder(
    @Headers('authorization-userid') userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(userId, dto);
  }

  @Get()
  @HttpCode(200)
  async getAllOrders(@Query() query: GetMyOrdersDto) {
    return this.ordersService.getAllOrders(query);
  }

  @Get('my')
  @HttpCode(200)
  async getMyOrders(
    @Headers('authorization-userid') userId: string,
    @Query() query: GetMyOrdersDto,
  ) {
    return this.ordersService.getMyOrders(userId, query);
  }

  @Get('my/:id')
  @HttpCode(200)
  async getMyOrderById(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
  ) {
    return this.ordersService.getMyOrderById(userId, orderId.toString());
  }

  @Put('my/:id')
  @HttpCode(200)
  async updateOrder(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @Body() dto: UpdateOrdersDto,
  ) {
    return this.ordersService.updateOrder(userId, orderId.toString(), dto);
  }

  @Put('my/:id/status/:status')
  @HttpCode(200)
  async updateOrderStatus(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @Param('status') statusValue: status,
  ) {
    return this.ordersService.updateOrderStatus(
      userId,
      orderId.toString(),
      statusValue,
    );
  }

  @Put('my/:id/cancel')
  @HttpCode(200)
  async cancelOrder(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
  ) {
    return this.ordersService.cancelOrder(userId, orderId.toString());
  }

  @Put('my/:id/refund')
  @HttpCode(200)
  async requestRefund(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @Body('reason') reason: string,
  ) {
    return this.ordersService.requestRefund(userId, orderId.toString(), reason);
  }

  @Get('my/status-count')
  @HttpCode(200)
  async getOrderCounts(@Headers('authorization-userid') userId: string) {
    return this.ordersService.getOrderCounts(userId);
  }
}
