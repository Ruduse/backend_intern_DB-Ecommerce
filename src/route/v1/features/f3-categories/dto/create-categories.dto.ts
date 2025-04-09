import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export default class CreateCategoriesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  @IsNotEmpty()
  position: string;

  @IsBoolean()
  @IsNotEmpty()
  isShow: boolean;

  @IsMongoId()
  @IsNotEmpty()
  parentId: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;
}
