import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ShopVoucherController from './shopVoucher.controller';
import ShopVoucherRepository from './shopVoucher.repository';
import ShopVoucherService from './shopVoucher.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShopVoucherModule.name,
        schema: ShopVoucherService,
      },
    ]),
  ],
  controllers: [ShopVoucherController],
  providers: [ShopVoucherService, ShopVoucherRepository],
  exports: [ShopVoucherService, ShopVoucherRepository],
})
export default class ShopVoucherModule {}
