import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CronSettingController from './cron-setting.controller';
import CronSettingRepository from './cron-setting.repository';
import CronSettingService from './cron-setting.service';
import { CronSetting, CronSettingSchema } from './schemas/cron-setting.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CronSetting.name,
        schema: CronSettingSchema,
      },
    ]),
  ],
  controllers: [CronSettingController],
  providers: [CronSettingService, CronSettingRepository],
  exports: [CronSettingService, CronSettingRepository],
})
export default class CronSettingModule {}
