import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsMongoId()
  creatorId: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsMongoId()
  brandId?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  warranties?: string[];

  @IsOptional()
  @IsNumber()
  viewsCount?: number;

  @IsOptional()
  @IsNumber()
  soldCount?: number;

  @IsOptional()
  @IsNumber()
  reviewsCount?: number;

  @IsOptional()
  @IsNumber()
  totalRatings?: number;

  @IsOptional()
  @IsNumber()
  likedCount?: number;

  @IsOptional()
  @IsBoolean()
  isHot?: boolean;

  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @IsOptional()
  @IsBoolean()
  isRewardPoint?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  skuMin?: string;

  @IsOptional()
  @IsString()
  skuMax?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  skuIds?: string[];

  @IsOptional()
  @IsMongoId()
  shopId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  idProductBravo?: string;
}
