import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IModelDto } from '../interfaces/model-dto.interface';

@Schema()
export class ModelEntity extends Document implements IModelDto {
  @Prop()
  id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  slug: string;
}

export const ModelEntitySchema = SchemaFactory.createForClass(ModelEntity);

ModelEntitySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
