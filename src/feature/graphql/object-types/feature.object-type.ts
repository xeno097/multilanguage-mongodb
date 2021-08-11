import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IFeatureDto } from 'src/feature/interfaces/feature-dto.interface';

@ObjectType()
export class Feature implements IFeatureDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}
