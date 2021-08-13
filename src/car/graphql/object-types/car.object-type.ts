import { ObjectType, Field } from '@nestjs/graphql';
import { ICarDto } from 'src/car/interfaces/car-dto.interface';
import { Feature } from 'src/feature/graphql/object-types/feature.object-type';
import { Model } from 'src/model/graphql/object-types/model.object-type';

@ObjectType()
export class Car implements ICarDto {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => Model)
  carModel: Model;

  @Field(() => [Feature])
  features: Feature[];
}
