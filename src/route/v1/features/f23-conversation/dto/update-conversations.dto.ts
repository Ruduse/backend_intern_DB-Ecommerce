import { PartialType } from '@nestjs/mapped-types';

export default class UpdateConservationDto extends PartialType(CreateConservationDto) {}
