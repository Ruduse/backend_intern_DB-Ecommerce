import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountDto } from './create-discounts.dto';

export default class UpdateDiscountDto extends PartialType(CreateDiscountDto) {}
