import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import DiscountsController from './discounts.controller';
import DiscountsRepository from './discounts.repository';
import DiscountsService from './discounts.service';
import { Discount, DiscountsSchema } from './schemas/discounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Discount.name,
        schema: DiscountsSchema,
      },
    ]),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService, DiscountsRepository],
  exports: [DiscountsService, DiscountsRepository],
})
export default class DiscountsModule {}
