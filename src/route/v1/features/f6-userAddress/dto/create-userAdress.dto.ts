import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateUserAdressDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsString()
  addressName?: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsNotEmpty()
  @IsString()
  provinceId?: string;

  @IsOptional()
  @IsString()
  districtId?: string;

  @IsNotEmpty()
  @IsString()
  villageId?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsNotEmpty()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsString()
  apartmentNumber?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
