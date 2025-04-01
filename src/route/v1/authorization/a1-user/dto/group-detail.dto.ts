import { MethodRouteEnum } from '@enum/method-route.enum';
import { IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class GroupDetailDto {
  @IsOptional()
  @IsMongoId()
  idGroupDetail?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(MethodRouteEnum, { each: true })
  accessMethods?: MethodRouteEnum[];
}
