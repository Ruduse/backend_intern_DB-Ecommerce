import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CheckEmailExistDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
