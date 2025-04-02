import { PartialType } from '@nestjs/mapped-types';
import CreateOrdersDto from './create-orders.dto';

export default class UpdateOrdersDto extends PartialType(CreateOrdersDto) {}
