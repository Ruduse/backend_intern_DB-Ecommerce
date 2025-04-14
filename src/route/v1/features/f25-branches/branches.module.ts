import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BranchController from './branches.controller';
import BranchRepository from './branches.repository';
import BranchService from './branches.service';
import { Branch, BranchSchema } from './schemas/branches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Branch.name,
        schema: BranchSchema,
      },
    ]),
  ],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService, BranchRepository],
})
export default class BranchModule {}
