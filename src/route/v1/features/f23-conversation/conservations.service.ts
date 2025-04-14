import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import ConservationRepository from './conservation.repository';
import { ConservationDocument } from './schemas/conservation.schema';

@Injectable()
export default class ConservationService extends BaseService<ConservationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly conservationRepository: ConservationRepository,
  ) {
    super(logger, conservationRepository);
  }
}
