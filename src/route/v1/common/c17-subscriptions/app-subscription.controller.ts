import AppSubscriptionService from '@common/c17-subscriptions/app-subscription.service';
import CreateSubscriptionDto from '@common/c17-subscriptions/dto/create-app-subscription..dto';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { GetUserIdHeader } from '@decorator/get-user-id-header';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-Subscriptions')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class AppSubscriptionController {
  constructor(readonly appSubscriptionService: AppSubscriptionService) {}

  @Get('/google-in-app/paid-content/:token/:sku')
  async getGoogleInAppPaidContent(
    @Param('token') token: string,
    @Param('sku') sku: string,
  ) {
    return this.appSubscriptionService.getGoogleInAppPaidContent(token, sku);
  }

  @Get('/google-subscription/paid-content/:token/:sku')
  async getGooglePlaySubscriptionPaidContent(
    @GetUserIdHeader() userId: string,
    @Param('token') token: string,
    @Param('sku') sku: string,
  ) {
    return this.appSubscriptionService.getGoogleSubscriptionPaidContent(
      userId,
      token,
      sku,
    );
  }

  @Post('/apple-paid-content')
  async getApplePaidContent(
    @GetUserIdHeader() userId: string,
    @Body('token') token: string,
  ) {
    return this.appSubscriptionService.getApplePaidContent(userId, token);
  }

  @Post('/')
  async createSubscription(
    @GetUserIdHeader() userId: string,
    @Body() input: CreateSubscriptionDto,
  ) {
    return this.appSubscriptionService.upsertOneBy({
      ...input,
      userId,
    });
  }

  @Get('/paginate')
  async paginate(@ApiQueryParams() query: AqpDto) {
    return this.appSubscriptionService.paginate(query);
  }
}
