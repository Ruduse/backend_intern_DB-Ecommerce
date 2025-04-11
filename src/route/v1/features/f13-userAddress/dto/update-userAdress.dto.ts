import { PartialType } from '@nestjs/mapped-types';
import CreateUserAdressDto from './create-userAdress.dto';

export default class UpdateUserAdressDto extends PartialType(
  CreateUserAdressDto,
) {}
