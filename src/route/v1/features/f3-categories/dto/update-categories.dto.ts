import { PartialType } from '@nestjs/mapped-types';
import CreateCategoriesDto from './create-categories.dto';

export default class UpdateCategoriesDto extends PartialType(
  CreateCategoriesDto,
) {}
