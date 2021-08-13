import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCarPayloadInput {
  @Field()
  title?: string;

  @Field(() => ID)
  carModel?: string;

  @Field(() => [ID])
  features?: string[];
}
