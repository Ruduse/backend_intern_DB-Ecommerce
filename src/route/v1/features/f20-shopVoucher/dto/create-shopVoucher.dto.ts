import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { DiscountType } from '../enums/discountType';

export class CreateShopVoucherDto {
  @IsString()
  @IsNotEmpty()
  shopId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  image?: string[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsNumber()
  @Min(0)
  discountValue: number;

  @IsNumber()
  @IsOptional()
  maxDiscountValue?: number;

  @IsNumber()
  @Min(0)
  minOrderValue: number;

  @IsNumber()
  @Min(1)
  maxUses: number;

  @IsNumber()
  @Min(0)
  usedCount: number;

  @IsNumber()
  @Min(1)
  maxUsesPerUser: number;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isSendNotification: boolean;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsNumber()
  validFrom: number;

  @IsNumber()
  validTo: number;

  @IsString()
  @IsEnum(['all', 'customer'])
  applyTo: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  customerIds?: string[];
}
