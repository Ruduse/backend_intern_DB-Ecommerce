import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewDetailDto {
  @IsMongoId()
  @IsNotEmpty()
  orderItemId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // mỗi phần tử trong mảng phải là string (link ảnh)
  @Type(() => String)
  images?: string[]; // Danh sách link ảnh người dùng gửi kèm
}
