import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { each } from 'lodash';
import { FlashSaleProductDto } from './flash-sale-product.dto';
import { Type } from 'class-transformer';

export default class CreateFlashSaleDto {
  @IsNotEmpty()
  @IsMongoId()
  creatorId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  validFrom: number;

  @IsNotEmpty()
  @IsNumber()
  validTo: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashSaleProductDto)
  products: FlashSaleProductDto[];

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}
