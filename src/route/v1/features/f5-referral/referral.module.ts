import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ReferralController from './referral.controller';
import ReferralRepository from './referral.repository';
import ReferralService from './referral.service';
import { Referral, ReferralSchema } from './schemas/referral.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Referral.name,
        schema: ReferralSchema,
      },
    ]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService, ReferralRepository],
  exports: [ReferralService, ReferralRepository],
})
export default class ReferralModule {}
