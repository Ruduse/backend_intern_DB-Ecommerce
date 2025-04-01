import BaseService from '@base-inherit/base.service';
import AppSubscriptionRepository from '@common/c17-subscriptions/app-subscription.repository';
import CreateSubscriptionDto from '@common/c17-subscriptions/dto/create-app-subscription..dto';
import { SubscriptionTypeEnum } from '@common/c17-subscriptions/enum/app-subscription-type.enum';
import { PlatformEnum } from '@common/c17-subscriptions/enum/platform.enum';
import { AppSubscriptionDocument } from '@common/c17-subscriptions/schemas/app-subscription.schema';
import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import GooglePlayBillingValidator, {
  IVerifier,
} from 'google-play-billing-validator';
import path from 'path';

@Injectable()
export default class AppSubscriptionService extends BaseService<AppSubscriptionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly appSubscriptionRepository: AppSubscriptionRepository,
  ) {
    super(logger, appSubscriptionRepository);

    this.init();
  }

  private googleVerifier: IVerifier;

  async init() {
    const credentialsPath = path.resolve(
      process.cwd(),
      'src',
      'util',
      'settings',
      'service-account.json',
    );
    const credentials = ShareFunction.readFileSync(credentialsPath).toString();
    const credentialsObj = JSON.parse(credentials);

    const options = {
      email: credentialsObj.client_email,
      key: credentialsObj.private_key,
    };

    this.googleVerifier = new GooglePlayBillingValidator(options);
  }

  async upsertSubscription(input: CreateSubscriptionDto) {
    return this.appSubscriptionRepository.upsertOneBy(input, {
      userId: input.userId,
      platform: input.platform,
      subscriptionType: input.subscriptionType,
      packageName: input.packageName,
      productId: input.productId,
      purchaseToken: input.purchaseToken,
    });
  }

  async getGoogleInAppPaidContent(token: string, sku: string) {
    let receipt = {
      packageName: ShareFunction.env().GOOGLE_PLAY_PACKAGE_NAME!,
      productId: sku,
      purchaseToken: token,
    };
    try {
      const promiseData = await this.googleVerifier.verifyINAPP(receipt);
      return promiseData;
    } catch (error) {
      return error;
    }
  }

  async getGoogleSubscriptionPaidContent(
    userId: string,
    token: string,
    sku: string,
  ) {
    let receipt = {
      packageName: ShareFunction.env().GOOGLE_PLAY_PACKAGE_NAME!,
      productId: sku,
      purchaseToken: token,
    };
    try {
      const res = await this.googleVerifier.verifySub(receipt);

      await this.upsertSubscription({
        ...receipt,
        userId,
        platform: PlatformEnum.Google,
        subscriptionType: SubscriptionTypeEnum.Subscription,
        successfulResponse: res,
        successRequestAt: Date.now(),
      }).catch(() => {});

      return res;
    } catch (error) {
      await this.upsertSubscription({
        ...receipt,
        userId,
        platform: PlatformEnum.Google,
        subscriptionType: SubscriptionTypeEnum.Subscription,
        failedResponse: error,
        failedRequestAt: Date.now(),
      }).catch(() => {});

      return error;
    }
  }

  async getApplePaidContent(userId: string, token: string) {
    const res = await axios.post(ShareFunction.env().APP_STORE_VERIFY_URL!, {
      'receipt-data': token,
      password: ShareFunction.env().APP_STORE_PASSWORD,
    });

    const upsertItem = {
      userId,
      productId: token,
      purchaseToken: token,
      packageName: ShareFunction.env().APP_STORE_VERIFY_URL,
      platform: PlatformEnum.Apple,
      subscriptionType: SubscriptionTypeEnum.Subscription,
    };

    if (!res.data) {
      await this.upsertSubscription({
        ...upsertItem,
        failedResponse: {
          error: 'Invalid receipt',
          ...(res?.data || {}),
        },
        failedRequestAt: Date.now(),
      }).catch(() => {});

      throw new BadRequestException("Can't verify receipt");
    }

    await this.upsertSubscription({
      ...upsertItem,
      successfulResponse: res.data,
      successRequestAt: Date.now(),
    }).catch(() => {});

    return res.data;
  }
}
