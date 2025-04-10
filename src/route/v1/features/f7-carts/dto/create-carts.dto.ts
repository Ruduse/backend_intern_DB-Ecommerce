import { Type } from 'class-transformer';

import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import AddToCartDto from './add-to-carts.dto';

export default class CreateCardDto {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddToCartDto)
  items: AddToCartDto[];
}
