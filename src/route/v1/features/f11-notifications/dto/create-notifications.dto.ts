import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNotificationsDto {
  @IsMongoId()
  @IsNotEmpty()
  senderId: string;

  @IsMongoId()
  @IsNotEmpty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  notificationType: string;

  @IsString()
  @IsNotEmpty()
  entityName: string;

  @IsMongoId()
  @IsNotEmpty()
  entityId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  isOpened?: boolean;

  @IsOptional()
  @IsObject()
  options?: Record<string, any>;
}
