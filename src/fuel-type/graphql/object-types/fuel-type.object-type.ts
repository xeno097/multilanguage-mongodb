import { ObjectType, Field } from '@nestjs/graphql';
import { IFuelTypeDto } from 'src/fuel-type/interfaces/fuel-type-dto.interface';

@ObjectType()
export class FuelType implements IFuelTypeDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}
