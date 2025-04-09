import { Type } from 'class-transformer';
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
import { AttributeDto } from './attribute.dto';

export default class CreateSkuDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuCode: string;

  @IsNumber()
  @IsNotEmpty()
  originalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  attributes: AttributeDto[];

  @IsNumber()
  @IsNotEmpty()
  quantity: Number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  soldCount: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
