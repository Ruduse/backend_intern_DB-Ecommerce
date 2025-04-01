import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import CreateTransactionDto from './create-transaction.dto';

export default class ThemeTransactionDto extends PartialType(
  CreateTransactionDto,
) {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  themeId: string;
}
