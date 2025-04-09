import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CustomerController from './customer.controller';
import CustomerRepository from './customer.repository';
import CustomerService from './customer.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService, CustomerRepository],
})
export default class CustomerModule {}
