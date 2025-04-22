import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserBankDto {
  @IsNotEmpty()
  @IsMongoId()
  userBankId: string;

  @IsNotEmpty()
  @IsString()
  bankName: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}
