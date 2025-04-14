import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  skuId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  likes?: number;

  @IsString()
  @IsOptional()
  replyId?: string;
}
