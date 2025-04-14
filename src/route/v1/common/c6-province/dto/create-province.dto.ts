import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateProvinceDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly slug: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsNumber()
  position: number;
}
