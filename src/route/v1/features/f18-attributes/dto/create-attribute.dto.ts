import { IsEnum, IsString } from 'class-validator';

export enum ValueTypeEnum {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

export class CreateAttributeDto {
  @IsString()
  creatorId: string;

  @IsString()
  name: string;

  @IsEnum(ValueTypeEnum)
  valueType: ValueTypeEnum;
}
