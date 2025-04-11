import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsMongoId()
  @IsNotEmpty()
  orderId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuId: string;

  @IsMongoId()
  @IsOptional()
  discountId?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  baseprice: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  discountAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  totalAmount: number;

  @IsMongoId()
  @IsNotEmpty()
  shopId: string;
}
