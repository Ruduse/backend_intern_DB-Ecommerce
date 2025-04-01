import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export default class CreateCategoriesDto {
  @IsMongoId()
  @IsNotEmpty()
  parentId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
