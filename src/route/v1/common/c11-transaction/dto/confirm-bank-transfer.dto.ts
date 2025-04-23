import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UserBankDto {
  @IsString()
  @IsNotEmpty()
  userBankId: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}

export class ConfirmBankTransferDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  transferContent: string;

  @IsString()
  @IsNotEmpty()
  transferImageUrl: string;

  @ValidateNested()
  @Type(() => UserBankDto)
  @IsNotEmpty()
  userBank?: UserBankDto;
}
