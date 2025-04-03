import { IsNotEmpty, IsString } from 'class-validator';

export class AttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
