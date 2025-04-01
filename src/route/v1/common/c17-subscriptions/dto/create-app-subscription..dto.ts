import { SubscriptionTypeEnum } from '@common/c17-subscriptions/enum/app-subscription-type.enum';
import { PlatformEnum } from '@common/c17-subscriptions/enum/platform.enum';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateSubscriptionDto {
  @IsOptional()
  @IsMongoId()
  userId: string;

  @IsEnum(PlatformEnum)
  platform: PlatformEnum;

  @IsOptional()
  @IsEnum(SubscriptionTypeEnum)
  subscriptionType?: SubscriptionTypeEnum;

  @IsOptional()
  @IsString()
  packageName?: string;

  @IsOptional()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  purchaseToken: string;

  @IsOptional()
  successfulResponse?: any;

  @IsOptional()
  failedResponse?: any;

  @IsOptional()
  @IsNumber()
  successRequestAt?: number;

  @IsOptional()
  @IsNumber()
  failedRequestAt?: number;
}
