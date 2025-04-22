import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';
import { CreateUserBankDto } from './create-user-bank.dto';
export class CreateRechargeDto {
  @IsNotEmpty()
  @IsEnum(TransactionMethodEnum)
  method: TransactionMethodEnum;
  // momo, vnpay, tranfer
  @IsNotEmpty()
  @IsNumber()
  money: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserBankDto)
  userBank: CreateUserBankDto;
  userBankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}
