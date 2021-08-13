import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { FeatureDto } from 'src/feature/dto/feature.dto';
import { ModelDto } from 'src/model/dto/model.dto.input';
import { ICarDto } from '../interfaces/car-dto.interface';

@Schema()
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
    type: Types.ObjectId,
    required: true,
  })
  carModel: ModelDto;

  @Prop({
    type: [Types.ObjectId],
    default: [],
  })
  features: FeatureDto[];
}

export const CarEntitySchema = SchemaFactory.createForClass(CarEntity);

CarEntitySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
