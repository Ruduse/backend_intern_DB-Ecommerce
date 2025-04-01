import { RoleEnum } from '@enum/role-user.enum';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';
import { Gender } from '../enums/gender.enum';
import { SocialType } from '../enums/social-type.enum';

export default class CreateUserDto {
  @ValidateIf((o) => o.role === RoleEnum.manager)
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groups: ObjectId[];

  @ValidateIf((o) => o.role === RoleEnum.manager)
  @IsOptional()
  @IsArray()
  groupDetails: any[];

  @ValidateIf((o) => o.role === RoleEnum.manager)
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIAccesses: ObjectId[];

  @ValidateIf((o) => o.role === RoleEnum.manager)
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIDenines: ObjectId[];

  @IsOptional()
  @IsString()
  tokenId: string;

  @IsOptional()
  @IsString()
  deviceID: string;

  @IsOptional()
  @IsBoolean()
  isEnableFCM: boolean;

  @IsOptional()
  @IsMongoId()
  themeId: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  linkFb: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsNumber()
  dateOfBirth: number;

  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted: boolean;

  @IsOptional()
  @IsEnum(RoleEnum)
  readonly role: RoleEnum;

  @IsOptional()
  @IsEnum(AccountStatus)
  readonly accountStatus: string;

  @IsOptional()
  @IsString()
  socialType: SocialType;

  @IsOptional()
  @IsString()
  socialKey: string;

  @IsOptional()
  fcmTokens: string[];

  @IsOptional()
  @IsString()
  @IsEnum(AccountType)
  accountType: AccountType;
}
