import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';

export class CreateRechargeDto {
  @IsNotEmpty()
  @IsEnum(TransactionMethodEnum)
  method: TransactionMethodEnum;

  @IsNotEmpty()
  @IsNumber()
  money: number;

  // Chỉ bắt buộc nếu là chuyển khoản ngân hàng
  @ValidateIf((o) => o.method === TransactionMethodEnum.transfer)
  @IsNotEmpty()
  @IsMongoId()
  userBankId: string;

  @ValidateIf((o) => o.method === TransactionMethodEnum.transfer)
  @IsOptional()
  @IsString()
  image?: string;

  @ValidateIf((o) => o.method === TransactionMethodEnum.transfer)
  @IsOptional()
  @IsString()
  content?: string;
}
