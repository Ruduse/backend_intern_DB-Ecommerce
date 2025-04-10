import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export default class AddToCartDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuId: string;

  @IsMongoId()
  @IsOptional()
  discountId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
