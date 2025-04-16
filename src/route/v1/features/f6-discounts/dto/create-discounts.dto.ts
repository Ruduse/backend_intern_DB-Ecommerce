import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum DiscountEnum {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}
export enum DiscountApplyToEnum {
  ALL = 'ALL',
  SPECIFIC = 'SPECIFIC',
}
export class CreateDiscountDto {
  @IsMongoId()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({
    description: 'Mã giảm giá',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsArray()
  @IsString({ each: true })
  image: string[];

  @IsNumber()
  @IsNotEmpty()
  name: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  discountType?: number;

  @IsDateString()
  @IsNotEmpty()
  discountValue: string;

  @IsDateString()
  @IsNotEmpty()
  validFrom: string;

  @IsDateString()
  @IsNotEmpty()
  validTo: string;

  @IsNumber()
  @IsNotEmpty()
  maxUses: number;

  @IsEnum(DiscountEnum)
  @IsNotEmpty()
  usersUsed: DiscountEnum;

  @IsNumber()
  @IsNotEmpty()
  maxUsesPerUser: number;

  @IsNumber()
  @IsNotEmpty()
  minOrderValue: number;

  @IsOptional()
  @IsNumber()
  isActive?: number;

  @IsNotEmpty()
  @IsEnum(DiscountApplyToEnum)
  applyTo: DiscountApplyToEnum;

  @IsDateString()
  @IsNotEmpty()
  productIds: string;

  @IsString()
  @IsNotEmpty()
  skuIds: string;

  @ApiProperty({
    description: 'Có gửi thông báo đến tất cả người dùng hay không',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isSendNotification: boolean;

  @IsEnum(DiscountEnum)
  @IsNotEmpty()
  nameEn: DiscountEnum;

  @IsNumber()
  @IsNotEmpty()
  descriptionEn: number;

  @IsOptional()
  @IsNumber()
  bulkDiscount?: number;
}
