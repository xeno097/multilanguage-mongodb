import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Query } from 'mongoose';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { IFuelTypeDto } from '../interfaces/fuel-type-dto.interface';
import { getFuelTypeEntityProjection } from './get-fuel-type-projection';

export const fuelTypeCollectionName = 'fueltypes';

@Schema({
  collection: fuelTypeCollectionName,
})
export class FuelTypeEntity extends Document implements IFuelTypeDto {
  @Prop()
  id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    type: {},
    default: {},
  })
  name_translations: Record<string, string>;

  @Prop({
    required: true,
    unique: true,
  })
  slug: string;
}

export interface FuelTypeEntityModel extends Model<FuelTypeEntity> {
  buildProjection(
    query: Query<any, any>,
    language?: LanguageCode,
  ): Query<any, any>;
}

export const FuelTypeEntitySchema =
  SchemaFactory.createForClass(FuelTypeEntity);

FuelTypeEntitySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});

FuelTypeEntitySchema.statics.buildProjection = (
  query: Query<any, any, any, any>,
  language: LanguageCode = LanguageCode.EN,
) => {
  query.projection(getFuelTypeEntityProjection(language));

  return query;
};
