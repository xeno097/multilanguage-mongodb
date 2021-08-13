import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';

@Module({
  providers: [CarResolver, CarService]
})
export class CarModule {}
