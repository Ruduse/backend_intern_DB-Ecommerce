import { IsOptional, IsString } from 'class-validator';

export default class CreateCountryDto {
  @IsOptional()
  @IsString()
  readonly country: string;

  @IsOptional()
  @IsString()
  readonly country_vietnamese: string;
}
