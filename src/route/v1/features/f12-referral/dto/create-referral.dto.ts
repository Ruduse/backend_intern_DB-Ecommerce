import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReferralStatus } from '../enums/referral.enums';

export default class CreateReferralDto {
  @IsNotEmpty()
  @IsString()
  sharedCodeFrom: string;

  @IsNotEmpty()
  @IsMongoId()
  customerTo: string;

  @IsOptional()
  @IsMongoId()
  customerFrom?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(ReferralStatus)
  status?: ReferralStatus;
}
