import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class SignupLocalDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string;

  @IsNotEmpty()
  @Length(4)
  readonly otpCode: string;
}
