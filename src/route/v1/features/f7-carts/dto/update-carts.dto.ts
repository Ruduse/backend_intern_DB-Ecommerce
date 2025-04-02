import { PartialType } from '@nestjs/mapped-types';
import CreateCardsDto from './create-carts.dto';
export default class UpdateItemsDto extends PartialType(CreateCardsDto) {}
