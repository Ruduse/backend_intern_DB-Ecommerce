import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-orders.dto';

export default class UpdateOrdersDto extends PartialType(CreateOrderDto) {}
