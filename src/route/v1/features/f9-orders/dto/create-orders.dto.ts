import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod } from '../enums/paymentMethod';
import { status } from '../enums/status';

class CheckoutDto {
  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsNumber()
  @IsNotEmpty()
  shippingCost: number;

  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}

class ShippingInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @Type(() => Date)
  fromDate: Date;

  @IsDate()
  @Type(() => Date)
  toDate: Date;
}
class ContactDto {
  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;
}


class StatusHistoryDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  @Type(() => Date)
  changedAt: Date;

  @IsString()
  @IsNotEmpty()
  changedBy: string;

  @IsString()
  @IsOptional()
  changeReason?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  changeImages?: string[];
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderBy: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsString()
  @IsNotEmpty()
  userAddressId: string;

  @IsString()
  @IsNotEmpty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  villageId: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  addressFull: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  @IsOptional()
  paymentInfo?: string;

  @IsString()
  @IsOptional()
  shopVoucherId?: string;

  @IsEnum(status)
  status: status;

  @ValidateNested()
  @Type(() => CheckoutDto)
  checkout: CheckoutDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatusHistoryDto)
  @IsOptional()
  statusHistories?: StatusHistoryDto[];

  @ValidateNested()
  @Type(() => ShippingInfoDto)
  shippingInfo: ShippingInfoDto;

  @IsString()
  @IsNotEmpty()
  shopId: string;
}
