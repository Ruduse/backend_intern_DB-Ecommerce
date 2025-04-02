import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateShippingMethodsDto {
  @IsMongoId()
  @IsNotEmpty()
  shopId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  estimatedDeliveryTime: number;
}
