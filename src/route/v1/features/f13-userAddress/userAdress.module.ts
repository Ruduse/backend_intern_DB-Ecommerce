import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAdress, UserAdressSchema } from './schemas/userAdress.schema';
import UserAdressController from './userAdress.controller';
import UserAdressRepository from './useradress.repository';
import UserAdressService from './userAdress.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserAdress.name,
        schema: UserAdressSchema,
      },
    ]),
  ],
  controllers: [UserAdressController],
  providers: [UserAdressService, UserAdressRepository],
  exports: [UserAdressService, UserAdressRepository],
})
export default class UserAdressModule {}
