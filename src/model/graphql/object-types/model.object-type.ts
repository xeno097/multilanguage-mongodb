import { Field, ObjectType } from '@nestjs/graphql';
import { IModelDto } from 'src/model/interfaces/model-dto.interface';

@ObjectType()
export class Model implements IModelDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}
