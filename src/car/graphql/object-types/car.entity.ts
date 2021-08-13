import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
