import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { UserBankDocument } from './schemas/userBank.schema';

@Injectable()
export default class UserBankRepository extends BaseRepository<UserBankDocument> {
  constructor(
    @InjectModel(UserBank.name) model: PaginateModel<UserBankDocument>,
  ) {
    super(model);
  }
}
