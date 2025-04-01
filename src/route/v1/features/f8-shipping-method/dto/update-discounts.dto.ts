import { PartialType } from '@nestjs/mapped-types';
import CreateDiscountsDto from './create-discounts.dto';

export default class UpdateDiscountsDto extends PartialType(CreateDiscountsDto) {}
