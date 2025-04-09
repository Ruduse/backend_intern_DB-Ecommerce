import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { UserAdressDocument } from './schemas/useradress.schema';
import UserAdressRepository from './useradress.repository';

@Injectable()
export default class UserAdressService extends BaseService<UserAdressDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly useradressRepository: UserAdressRepository,
  ) {
    super(logger, useradressRepository);
  }
}
