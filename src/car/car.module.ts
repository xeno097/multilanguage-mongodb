import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CarEntity, CarEntitySchema } from './database/car.entity';
import { CarRepository } from './car.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CarEntity.name,
        schema: CarEntitySchema,
      },
    ]),
  ],
  providers: [
    CarResolver,
    CarService,
    {
      provide: CarRepository.name,
      useClass: CarRepository,
    },
  ],
})
export class CarModule {}
