import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BranchController from './branches.controller';
import BranchRepository from './branches.repository';
import BranchService from './branches.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BranchModule.name,
        schema: BranchService,
      },
    ]),
  ],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService, BranchRepository],
})
export default class BranchModule {}
