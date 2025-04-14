import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-products.dto';

export default class UpdateProductsDto extends PartialType(CreateProductDto) {}
