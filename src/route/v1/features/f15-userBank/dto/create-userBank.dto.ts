import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateBankDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  bankId: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsNumber()
  accountNumber: Number;

  @IsNotEmpty()
  @IsString()
  holder: string;

  @IsOptional()
  @IsString()
  passport: string;

  @IsNotEmpty()
  @IsNumber()
  phone: Number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value)) // Chuyển đổi chuỗi thành Date
  expirationDate: Date;

  @IsNotEmpty()
  @IsString()
  ccv: string;

  @IsOptional()
  @IsBoolean()
  isStoreBank?: boolean;
}
