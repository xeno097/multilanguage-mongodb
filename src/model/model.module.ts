import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelResolver } from './model.resolver';
import { ModelRepository } from './model.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelEntity, ModelEntitySchema } from './database/model.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelEntity.name,
        schema: ModelEntitySchema,
      },
    ]),
  ],
  providers: [
    ModelResolver,
    ModelService,
    { provide: ModelRepository.name, useClass: ModelRepository },
  ],
})
export class ModelModule {}
