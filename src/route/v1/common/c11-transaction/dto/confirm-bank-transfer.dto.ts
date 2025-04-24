import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserBankDto } from './create-user-bank.dto';


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
  @Type(() => CreateUserBankDto)
  @IsNotEmpty()
  userBank: CreateUserBankDto;
}
