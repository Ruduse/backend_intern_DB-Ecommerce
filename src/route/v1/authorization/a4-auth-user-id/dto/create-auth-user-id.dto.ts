import { MethodRouteEnum } from '@enum/method-route.enum';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateAuthUserIdDto {
  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsOptional()
  @IsArray()
  @IsEnum(MethodRouteEnum, { each: true })
  accessMethods: MethodRouteEnum[];

  @IsOptional()
  @IsString()
  referId: string;

  @IsOptional()
  @IsString()
  collectionName: string;
}
