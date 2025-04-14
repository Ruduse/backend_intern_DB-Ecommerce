import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  isShow?: boolean;

  @IsOptional()
  @IsNumber()
  posittion: string;
}
