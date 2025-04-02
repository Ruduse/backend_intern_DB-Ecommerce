import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './create-order-items.dto';
export default class UpdateOrderItemsDto extends PartialType(
  CreateOrderItemDto,
) {}
