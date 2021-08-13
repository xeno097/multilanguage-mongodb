import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IFeatureDto } from '../interfaces/feature-dto.interface';

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
    required: true,
  })
  name_translations: Record<string, string>;

  @Prop({
    required: true,
    unique: true,
  })
  slug: string;
}

export const FeatureSchema = SchemaFactory.createForClass(FeatureEntity);

FeatureSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
