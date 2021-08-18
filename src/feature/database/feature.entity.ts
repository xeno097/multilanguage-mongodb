import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Query } from 'mongoose';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { IFeatureDto } from '../interfaces/feature-dto.interface';
import { getFeatureProjection } from './feature-projection';

export const featureCollectionName = 'features';

@Schema({
  collection: featureCollectionName,
})
export class FeatureEntity extends Document implements IFeatureDto {
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

export interface FeatureEntityModel extends Model<FeatureEntity> {
  buildProjection(
    query: Query<any, any>,
    language?: LanguageCode,
  ): Query<any, any>;
}

export const FeatureSchema = SchemaFactory.createForClass(FeatureEntity);

FeatureSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});

FeatureSchema.statics.buildProjection = (
  query: Query<any, any, any, any>,
  language: LanguageCode = LanguageCode.EN,
) => {
  query.projection(getFeatureProjection(language));

  return query;
};
