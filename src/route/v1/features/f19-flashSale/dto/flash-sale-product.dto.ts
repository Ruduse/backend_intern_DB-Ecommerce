import { IsNumber, IsString, Min } from 'class-validator';
export class FlashSaleProductDto {
  @IsNumber()
  @Min(0)
  flashSalePrice: number;

  @IsString()
  productId: string;

  @IsString()
  skuId: string;

  @IsNumber()
  @Min(1)
  maxQuantity: number;

  @IsNumber()
  @Min(0)
  soldCount: number;
}
