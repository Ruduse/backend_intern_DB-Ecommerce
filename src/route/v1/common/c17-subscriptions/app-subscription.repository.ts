import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AppSubscription,
  AppSubscriptionDocument,
} from './schemas/app-subscription.schema';

@Injectable()
export default class AppSubscriptionRepository extends BaseRepository<AppSubscriptionDocument> {
  constructor(
    // @ts-ignore
    @InjectModel(AppSubscription.name)
    model: PaginateModel<AppSubscriptionDocument>,
  ) {
    super(model);
  }
}
