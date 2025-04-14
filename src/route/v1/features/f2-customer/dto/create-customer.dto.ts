import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../enums/gender';

export default class CreateCustomerDto {
  @IsNotEmpty()
  @IsMongoId()
  UserId: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsNumber()
  @IsNotEmpty()
  socialPhone: number;

  @IsString()
  @IsNotEmpty()
  socialEmail: string;

  @IsNumber()
  @IsNotEmpty()
  contactPhone: number;

  @IsString()
  @IsNotEmpty()
  contactEmail: string;

  // Giả sử ReferralId bắt buộc:
  @IsString()
  @IsNotEmpty()
  ReferralId: string;

  @IsOptional()
  @IsString()
  myShareCode?: string;

  // Giả sử sharedCodeFrom bắt buộc:
  @IsString()
  @IsNotEmpty()
  sharedCodeFrom: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  savedProductIds: string[] = [];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  shopVoucherIds?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  usedShopVoucherIds?: string[];
}
