import { MethodRouteEnum } from '@enum/method-route.enum';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddGroupDetailDto {
  @IsNotEmpty()
  @IsMongoId()
  idGroupDetail: string;

  @IsArray()
  @IsEnum(MethodRouteEnum, { each: true })
  accessMethods: MethodRouteEnum[];
}
