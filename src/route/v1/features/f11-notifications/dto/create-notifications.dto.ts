import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationsDto {
  @IsMongoId()
  @IsNotEmpty()
  senderId: string;

  @IsMongoId()
  @IsNotEmpty()
  recipientId: string;

  @IsOptional()
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @IsString()
  @IsNotEmpty()
  entityName?: string;

  @IsMongoId()
  @IsNotEmpty()
  entityId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsBoolean()
  @IsNotEmpty()
  isOpened: boolean;

  @IsString()
  @IsOptional()
  options?: string;
}
