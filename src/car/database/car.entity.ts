import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Query, Schema as MongooseSchema } from 'mongoose';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { getFeatureProjection } from 'src/feature/database/feature-projection';
import { FeatureEntity } from 'src/feature/database/feature.entity';
import { FeatureDto } from 'src/feature/dto/feature.dto';
import { FuelTypeEntity } from 'src/fuel-type/database/fuel-type.entity';
import { getFuelTypeEntityProjection } from 'src/fuel-type/database/get-fuel-type-projection';
import { FuelTypeDto } from 'src/fuel-type/dto/fuel-type.dto';
import { ModelEntity } from 'src/model/database/model.entity';
import { ModelDto } from 'src/model/dto/model.dto.input';
import { ICarDto } from '../interfaces/car-dto.interface';

export const carCollectionName = 'cars';

@Schema({
  collection: carCollectionName,
})
export class CarEntity extends Document implements ICarDto {
  @Prop()
  id: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ModelEntity.name,
    required: true,
  })
  carModel: ModelDto;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: FuelTypeEntity.name,
    required: true,
  })
  fuelType: FuelTypeDto;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: FeatureEntity.name,
    default: [],
  })
  features: FeatureDto[];
}

export interface CarEntityModel extends Model<CarEntity> {
  buildProjection(
    query: Query<any, any>,
    language?: LanguageCode,
  ): Query<any, any>;
}

export const CarEntitySchema = SchemaFactory.createForClass(CarEntity);

CarEntitySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});

CarEntitySchema.statics.buildProjection = (
  query: Query<any, any, any, any>,
  language: LanguageCode = LanguageCode.EN,
) => {
  query.populate({
    path: 'features',
    select: getFeatureProjection(language),
  });

  query.populate({ path: 'carModel' });

  query.populate({
    path: 'fuelType',
    select: getFuelTypeEntityProjection(language),
  });

  return query;
};
