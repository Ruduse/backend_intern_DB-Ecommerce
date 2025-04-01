import AppSubscriptionController from '@common/c17-subscriptions/app-subscription.controller';
import AppSubscriptionRepository from '@common/c17-subscriptions/app-subscription.repository';
import AppSubscriptionService from '@common/c17-subscriptions/app-subscription.service';
import {
  AppSubscription,
  AppSubscriptionSchema,
} from '@common/c17-subscriptions/schemas/app-subscription.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AppSubscription.name,
        schema: AppSubscriptionSchema,
      },
    ]),
  ],
  controllers: [AppSubscriptionController],
  providers: [AppSubscriptionService, AppSubscriptionRepository],
  exports: [AppSubscriptionService, AppSubscriptionRepository],
})
export default class AppSubscriptionModule {}
