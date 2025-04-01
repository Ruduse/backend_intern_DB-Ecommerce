import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, Max } from 'class-validator';

export default class AqpDto {
  @ApiPropertyOptional({
    type: Object,
    default: {},
  })
  @IsObject()
  filter: any = {};

  @ApiPropertyOptional({
    type: Boolean,
    default: 0,
  })
  @IsNumber()
  readonly skip: number = 0;

  @ApiPropertyOptional({
    type: Boolean,
    default: 20,
  })
  @IsNumber()
  @Max(100)
  readonly limit: number = 20;

  @ApiPropertyOptional({
    type: Object,
    default: {},
  })
  @IsObject()
  readonly sort: any = {};

  @ApiPropertyOptional({
    type: Object,
    default: {},
  })
  @IsObject()
  projection: any = {};

  @ApiPropertyOptional({
    type: Array,
    default: [],
  })
  @IsArray()
  readonly population: any[] = [];
}
