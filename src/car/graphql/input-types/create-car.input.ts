import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
