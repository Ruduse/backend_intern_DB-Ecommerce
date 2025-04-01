import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
  CronSetting,
  CronSettingDocument,
} from './schemas/cron-setting.schema';

@Injectable()
export default class CronSettingRepository extends BaseRepository<CronSettingDocument> {
  constructor(
    @InjectModel(CronSetting.name) model: PaginateModel<CronSettingDocument>,
  ) {
    super(model);
  }
}
