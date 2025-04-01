import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CronSettingRepository from './cron-setting.repository';
import { CronSettingDocument } from './schemas/cron-setting.schema';

@Injectable()
export default class CronSettingService extends BaseService<CronSettingDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cronSettingRepository: CronSettingRepository,
  ) {
    super(logger, cronSettingRepository);
  }
}
