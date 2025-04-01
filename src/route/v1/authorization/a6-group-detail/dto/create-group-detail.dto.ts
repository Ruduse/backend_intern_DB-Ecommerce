import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MultiLangDto {
  @IsNotEmpty()
  @IsString()
  vi: string;

  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ko: string;

  @IsNotEmpty()
  @IsString()
  ja: string;
}

export default class CreateGroupDetailDto {
  @IsNotEmpty()
  @IsString()
  collectionName: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  refers: string[];

  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => MultiLangDto)
  name: MultiLangDto;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  position?: number;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsBoolean()
  isHorizontalMenu?: boolean;
}
