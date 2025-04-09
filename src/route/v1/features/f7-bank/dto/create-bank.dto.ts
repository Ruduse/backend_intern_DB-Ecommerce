import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateBankDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortName: string;

  @IsNotEmpty()
  @IsString()
  branch: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  isShow?: boolean;

}
