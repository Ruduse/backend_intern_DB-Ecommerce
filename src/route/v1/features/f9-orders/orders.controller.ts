import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import { CreateReviewDetailDto } from '../f21-review/dto/create-review-detail.dto';
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

  //get my order by orderId
  @Get('my/:id')
  @HttpCode(200)
  async getMyOrderById(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
  ) {
    return this.ordersService.getMyOrderById(userId, orderId.toString());
  }
  @Post('my/:id/review')
  @HttpCode(201)
  async createOrderReview(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @Body() dto: CreateReviewDetailDto,
  ) {
    return this.ordersService.createReview(userId, orderId.toString(), dto);
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
  // @Get('my/status/:status')
  // @HttpCode(200)
  // async getOrdersByStatus(
  //   @Headers('authorization-userid') userId: string,
  //   @Param('status') orderStatus: status,
  // ) {
  //   return this.ordersService.getByStatus(userId, orderStatus);
  // }
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
  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(
    @Headers('authorization-userid') userId: string,
    @ApiQueryParams() query: AqpDto,
  ): Promise<any> {
    query.filter = {
      ...query.filter,
      customerId: userId,
    };

    if (query.status) {
      query.filter.status = query.status;
    }

    const [data, counts] = await Promise.all([
      this.ordersService.paginate(query),
      this.ordersService.countOrdersByStatus(userId),
    ]);

    return {
      data,
      counts, // trả về tổng số đơn theo từng status
    };
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get('/one')
  @HttpCode(200)
  async findOneBy(
    @ApiQueryParams() { filter, projection }: AqpDto,
  ): Promise<any> {
    return this.ordersService.findOneBy(filter, {
      filter,
      projection,
    });
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.ordersService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
