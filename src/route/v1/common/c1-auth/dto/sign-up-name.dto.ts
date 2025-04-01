import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class SignUpNameDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly deviceID?: string;
}
