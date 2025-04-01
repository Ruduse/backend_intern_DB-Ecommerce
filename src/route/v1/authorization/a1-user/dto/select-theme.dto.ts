import { IsMongoId, IsNotEmpty } from 'class-validator';

export default class SelectThemeDto {
  @IsNotEmpty()
  @IsMongoId()
  userThemeId: string;
}
