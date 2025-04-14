import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Conservation, ConservationDocument } from './schemas/conservation.schema';

@Injectable()
export default class ConservationRepository extends BaseRepository<ConservationDocument> {
  constructor(@InjectModel(Conservation.name) model: PaginateModel<ConservationDocument>) {
    super(model);
  }
}
