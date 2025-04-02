import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export default class CreateOrdersDto {
  @IsMongoId()
  @IsNotEmpty()
  shopId: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  discountId?: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  shippingMethodId?: string;

  @IsOptional()
  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsEnum(['pending', 'completed', 'cancelled'])
  status?: 'pending' | 'completed' | 'cancelled';
}
