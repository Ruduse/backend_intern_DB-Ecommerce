import { Injectable } from '@nestjs/common';

import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import BranchRepository from './branches.repository';
import { BranchDocument } from './schemas/branches.schema';

@Injectable()
export default class BranchService extends BaseService<BranchDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly branchRepository: BranchRepository, // Đảm bảo đây là BranchRepository
  ) {
    super(logger, branchRepository);
  }
}
