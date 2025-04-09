import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateShopDto {
  @IsMongoId()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsNotEmpty()
  @IsNumber()
  SocialPhone: number;

  @IsOptional()
  @IsString()
  SocialMail?: string;

  @IsNotEmpty()
  @IsString()
  provinceId: string;

  @IsNotEmpty()
  @IsString()
  districtId: string;

  @IsNotEmpty()
  @IsString()
  villageId: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  totalRating?: number;

  @IsOptional()
  @IsNumber()
  totalReview?: number;

  @IsOptional()
  @IsNumber()
  totalProduct?: number;
}
