import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IFuelTypeDto } from '../interfaces/fuel-type-dto.interface';

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
    required: true,
  })
  name_translations: Record<string, string>;

  @Prop({
    required: true,
    unique: true,
  })
  slug: string;
}

export const FuelTypeEntitySchema =
  SchemaFactory.createForClass(FuelTypeEntity);

FuelTypeEntitySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
