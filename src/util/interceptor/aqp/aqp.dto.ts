import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  Max,
} from 'class-validator';
import { status } from 'src/route/v1/features/f9-orders/enums/status';

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
  // add page
  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  @IsNumber()
  readonly page: number = 1;
  // add status
  @ApiPropertyOptional({ enum: status })
  @IsOptional()
  @IsEnum(status, { each: true })
  status?: status | status[];
}
