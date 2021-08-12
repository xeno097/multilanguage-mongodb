import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateModelInput {
  @Field()
  name: string;
}
