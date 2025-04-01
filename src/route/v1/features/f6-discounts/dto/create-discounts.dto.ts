import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsDate, IsDateString} from 'class-validator';

export default class CreateDiscountsDto {
  @IsString()
  @IsNotEmpty()
  shopId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(['percentage', 'fixed'])
  @IsNotEmpty()
  discountType: string;

  @IsNumber()
  @IsNotEmpty()
  discountValue: number;

  @IsNumber()
  @IsNotEmpty()
  minOrderValue: number;

  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
