import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export default class AddToCartDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
