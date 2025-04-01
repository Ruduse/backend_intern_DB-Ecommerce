import { PartialType } from '@nestjs/mapped-types';
import CreateCronSettingDto from './create-cron-setting.dto';

export default class UpdateCronSettingDto extends PartialType(
  CreateCronSettingDto,
) {}
