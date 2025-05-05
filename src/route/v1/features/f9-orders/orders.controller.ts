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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { GetCurrentUser } from '@decorator/get-current-user';
import { RoleEnum, UserRoleEnum } from '@enum/role-user.enum';
import RolesGuard from '@guard/roles.guard';
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
  @UseGuards(RolesGuard)
  @Put('my/:id/status/:status')
  @HttpCode(200)
  async updateStatus(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @Param('status') statusValue: status,
    @GetCurrentUser() user: { UserRole: UserRoleEnum; role: RoleEnum }, // Lấy user từ decorator
  ) {
    return this.ordersService.updateStatus(
      user,
      userId,
      orderId.toString(),
      statusValue,
    );
  }
  @UseGuards(RolesGuard)
  @Put('my/:id/cancel')
  @HttpCode(200)
  async cancelOrder(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @GetCurrentUser() user: { UserRole: UserRoleEnum; role: RoleEnum }, // Lấy user từ decorator
  ) {
    return this.ordersService.cancelOrder(userId, orderId.toString(), user);
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
    return this.ordersService.paginate(query, userId);
  }
  @Get('detail/:id')
  @HttpCode(200)
  async getMyOrderDetail(
    @Headers('authorization-userid') userId: string,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
    @ApiQueryParams() query: AqpDto,
  ): Promise<any> {
    return this.ordersService.getMyOrderDetail(
      query,
      userId,
      orderId.toString(),
    );
  }
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
