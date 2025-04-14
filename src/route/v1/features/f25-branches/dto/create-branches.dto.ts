import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsInt()
  provinceId: number;

  @IsInt()
  districtId: number;

  @IsInt()
  villageId: number;

  @IsString()
  street: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
}
