import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { SocialType } from '@authorization/a1-user/enums/social-type.enum';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class SignInWithSocialDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEnum(SocialType)
  socialType: SocialType;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  socialKey: string;
}
