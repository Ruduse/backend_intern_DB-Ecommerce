import { SubscriptionTypeEnum } from '@common/c17-subscriptions/enum/app-subscription-type.enum';
import { PlatformEnum } from '@common/c17-subscriptions/enum/platform.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'app-subscriptions',
})
export class AppSubscription {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, enum: PlatformEnum })
  platform: PlatformEnum;

  @Prop({ type: String, enum: SubscriptionTypeEnum })
  subscriptionType: SubscriptionTypeEnum;

  @Prop({
    type: String,
    default: 'com.selfcare.diary.mood.tracker.daily',
  })
  packageName: string;

  @Prop({ type: String })
  productId: string;

  @Prop({ type: String, required: true })
  purchaseToken: string;

  @Prop({ type: SchemaTypes.Mixed })
  successfulResponse?: any;

  @Prop({ type: SchemaTypes.Mixed })
  failedResponse?: any;

  @Prop({ type: Number })
  successRequestAt?: number;

  @Prop({ type: Number })
  failedRequestAt?: number;
}

export type AppSubscriptionDocument = AppSubscription & Document;
export const AppSubscriptionSchema =
  SchemaFactory.createForClass(AppSubscription);

AppSubscriptionSchema.index(
  {
    userId: 1,
    platform: 1,
    subscriptionType: 1,
    packageName: 1,
    productId: 1,
    purchaseToken: 1,
  },
  { unique: true },
);
