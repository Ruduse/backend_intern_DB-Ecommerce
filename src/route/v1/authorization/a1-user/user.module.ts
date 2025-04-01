import TransactionModule from '@common/c11-transaction/transaction.module';
import SettingModule from '@common/c13-setting/setting.module';
import OtpModule from '@common/c2-otp/otp.module';
import HttpClientModule from '@lazy-module/http-client/http-client.module';
import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FcmUserService from './fcm/fcm-user.service';
import { User, UserSchema } from './schemas/user.schema';
import UserController from './user.controller';
import UserRepository from './user.repository';
import UserService from './user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          // eslint-disable-next-line
          schema.plugin(require('mongoose-slug-updater'));

          return schema;
        },
      },
    ]),
    OtpModule,
    HttpClientModule,
    SettingModule,
    forwardRef(() => TransactionModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, FcmUserService],
  exports: [UserService, UserRepository, FcmUserService],
})
export default class UserModule {}
