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
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { CreateUserBankDto } from './create-user-bank.dto';
export default class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  userFrom: string;

  @IsOptional()
  @IsString()
  userTo?: string;

  @IsNotEmpty()
  @IsEnum(TransactionMethodEnum)
  method: TransactionMethodEnum;

  @IsNotEmpty()
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  transactionType: TransactionTypeEnum;

  @IsNotEmpty()
  @IsString()
  title: string;

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
}
