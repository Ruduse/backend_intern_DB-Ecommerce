import { PartialType } from '@nestjs/mapped-types';
import CreateShippingMethodsDto from './create-shipping-methods.dto';
export default class UpdateShippingMethodsDto extends PartialType(
  CreateShippingMethodsDto,
) {}
