import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { UserAdress, UserAdressDocument } from './schemas/useradress.schema';

@Injectable()
export default class UserAdressRepository extends BaseRepository<UserAdressDocument> {
  constructor(@InjectModel(UserAdress.name) model: PaginateModel<UserAdressDocument>) {
    super(model);
  }
}
