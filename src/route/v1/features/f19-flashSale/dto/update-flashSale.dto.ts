import { PartialType } from '@nestjs/mapped-types';
import CreateFlashSaleDto from './create-flashSale.dto';

export default class UpdateFlashSaleDto extends PartialType(
  CreateFlashSaleDto,
) {}
