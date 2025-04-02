import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class CardItemDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;
  @IsMongoId()
  @IsNotEmpty()
  skuId: string;
  @IsNotEmpty()
  @IsString()
  quantity: number;
}
export default class CreateCardDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardItemDto)
  items: CardItemDto[];
}
