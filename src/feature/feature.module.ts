import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureResolver } from './feature.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureEntity, FeatureSchema } from './database/feature.entity';
import { FeatureRepository } from './feature.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FeatureEntity.name,
        schema: FeatureSchema,
      },
    ]),
  ],
  providers: [
    FeatureResolver,
    FeatureService,
    {
      provide: FeatureRepository.name,
      useClass: FeatureRepository,
    },
  ],
})
export class FeatureModule {}
