import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { shopVoucher, ShopVoucherSchema } from './schemas/shopVoucher.schema';
import ShopVoucherController from './shopVoucher.controller';
import ShopVoucherRepository from './shopVoucher.repository';
import ShopVoucherService from './shopVoucher.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: shopVoucher.name,
        schema: ShopVoucherSchema,
      },
    ]),
  ],
  controllers: [ShopVoucherController],
  providers: [ShopVoucherService, ShopVoucherRepository],
  exports: [ShopVoucherService, ShopVoucherRepository],
})
export default class ShopVoucherModule {}
