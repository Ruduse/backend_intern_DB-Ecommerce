import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
export default class CreateTransactionDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  entityId: string;

  @IsOptional()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @IsOptional()
  @IsEnum(TransactionMethodEnum)
  method: TransactionMethodEnum;

  @IsOptional()
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;

  @IsOptional()
  @IsNumber()
  clovers: number;

  @IsOptional()
  @IsNumber()
  money: number;

  @IsOptional()
  @IsString()
  options: string;

  @IsOptional()
  @IsString()
  transactionCode: string;
}
