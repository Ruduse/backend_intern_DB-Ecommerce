import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod } from '../enums/paymentMethod';
import { status } from '../enums/status';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsString()
  @IsOptional()
  note?: string;
}

export class CheckoutDto {
  @IsNotEmpty()
  subTotal: number;

  @IsNotEmpty()
  shippingCost: number;

  @IsNotEmpty()
  discountAmount: number;

  @IsNotEmpty()
  totalAmount: number;
}

export class ShippingInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsDate()
  fromDate: Date;

  @IsOptional()
  @IsDate()
  toDate: Date;
}

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  total: number;

  @IsString()
  @IsOptional()
  note?: string;
}

export class OrderDetailResponseDto {
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @IsEnum(status)
  status: status;

  @IsString()
  @IsOptional()
  statusLabel?: string;

  @IsString()
  @IsOptional()
  statusDescription?: string;

  @IsBoolean()
  canCancel: boolean;

  @IsBoolean()
  canReview: boolean;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsDate()
  orderDate: Date;

  @IsOptional()
  @IsDate()
  cancelDate?: Date;

  @ValidateNested()
  @Type(() => ShippingInfoDto)
  shippingInfo: ShippingInfoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @ValidateNested()
  @Type(() => CheckoutDto)
  summary: CheckoutDto;
}
