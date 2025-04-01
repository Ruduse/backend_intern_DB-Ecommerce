import { IsArray, IsNumber, IsString } from 'class-validator';

export default class CreateSkuDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsArray()
  attributes: { name: string; value: string }[];

  @IsArray()
  images: string[];
}
