import { IsMongoId, IsNotEmpty } from 'class-validator';

export default class SetupThemeDto {
  @IsNotEmpty()
  @IsMongoId()
  themeId: string;
}
