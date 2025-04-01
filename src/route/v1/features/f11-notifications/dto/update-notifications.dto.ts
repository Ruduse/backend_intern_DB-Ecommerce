import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationsDto } from './create-notifications.dto';

export default class UpdateNotificationsDto extends PartialType(
  CreateNotificationsDto,
) {}
