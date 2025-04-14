import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBank, UserBankSchema } from './schemas/userBank.schema';
import UserBankController from './userBank.controller';
import UserBankRepository from './userBank.repository';
import UserBankService from './userBank.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserBank.name,
        schema: UserBankSchema,
      },
    ]),
  ],
  controllers: [UserBankController],
  providers: [UserBankService, UserBankRepository],
  exports: [UserBankService, UserBankRepository],
})
export default class UserBankModule {}
