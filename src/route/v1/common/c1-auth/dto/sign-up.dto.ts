import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { RoleEnum } from '@enum/role-user.enum';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class SignupDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  readonly deviceID: string;

  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsEnum(RoleEnum)
  role: RoleEnum = RoleEnum.customer;

  @IsNotEmpty()
  @Length(6)
  readonly otpCode: string;
}
