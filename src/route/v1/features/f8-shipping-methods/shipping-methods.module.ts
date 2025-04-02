import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShippingMethod,
  ShippingMethodsSchema,
} from './schemas/shipping-methods.schema';
import ShippingMethodsController from './shipping-methods.controller';
import ShippingMethodsRepository from './shipping-methods.repository';
import ShippingMethodsService from './shipping-methods.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShippingMethod.name,
        schema: ShippingMethodsSchema,
      },
    ]),
  ],
  controllers: [ShippingMethodsController],
  providers: [ShippingMethodsService, ShippingMethodsRepository],
  exports: [ShippingMethodsService, ShippingMethodsRepository],
})
export default class ShippingMethodsModule {}
