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
  fullName: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNumber()
  @IsNotEmpty()
  point?: string;

  @IsNumber()
  @IsNotEmpty()
  socialPhone?: number;

  @IsString()
  @IsNotEmpty()
  socialEmail?: string;

  @IsNumber()
  @IsNotEmpty()
  contactPhone?: number;

  @IsString()
  @IsNotEmpty()
  contactEmail?: string;

  @IsString()
  @IsNotEmpty()
  ReferralId?: string;

  @IsString()
  @IsNotEmpty()
  myShareCode?: string;

  @IsString()
  @IsNotEmpty()
  sharedCodeFrom?: string;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth?: Date;

  @IsNumber()
  @IsNotEmpty()
  balance?: number;

  @IsArray()
  @IsOptional()
  savedProductIds: String[];

  @IsArray()
  @IsOptional()
  shopVoucherIds: String[];

  @IsArray()
  @IsOptional()
  usedShopVoucherIds: String[];
}
