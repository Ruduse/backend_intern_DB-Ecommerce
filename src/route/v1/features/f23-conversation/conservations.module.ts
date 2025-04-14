import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ConservationController from './conservation.controller';
import ConservationRepository from './conservation.repository';
import ConservationService from './conservation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConservationModule.name,
        schema: ConservationService,
      },
    ]),
  ],
  controllers: [ConservationController],
  providers: [ConservationService, ConservationRepository],
  exports: [ConservationService, ConservationRepository],
})
export default class ConservationModule {}
