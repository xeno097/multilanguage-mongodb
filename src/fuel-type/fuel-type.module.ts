import { Module } from '@nestjs/common';
import { FuelTypeService } from './fuel-type.service';
import { FuelTypeResolver } from './fuel-type.resolver';
import { FuelTypeRepository } from './fuel-type.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FuelTypeEntity,
  FuelTypeEntitySchema,
} from './database/fuel-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FuelTypeEntity.name,
        schema: FuelTypeEntitySchema,
      },
    ]),
  ],
  providers: [
    FuelTypeResolver,
    FuelTypeService,
    { provide: FuelTypeRepository.name, useClass: FuelTypeRepository },
  ],
})
export class FuelTypeModule {}
