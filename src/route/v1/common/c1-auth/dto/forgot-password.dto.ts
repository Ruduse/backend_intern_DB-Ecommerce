import { IsNotEmpty, IsString } from 'class-validator';

export default class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
