import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  TransactionMethod,
  TransactionStatus,
  TransactionType,
} from '../enums/transaction.enums';

class UserBankReceivedDto {
  @IsOptional()
  @IsString()
  userBankId?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  accountName?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsMongoId()
  userFrom: string;

  @IsNotEmpty()
  @IsMongoId()
  userTo: string;

  @IsNotEmpty()
  @IsEnum(TransactionMethod)
  method: TransactionMethod;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsNumber()
  money: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserBankReceivedDto)
  userBankReceived?: UserBankReceivedDto;
}
