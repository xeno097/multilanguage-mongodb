import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCarInput {
  @Field()
  title: string;

  @Field(() => ID)
  carModel: string;

  @Field(() => [ID])
  features: string[];

  @Field(() => ID)
  fuelType: string;
}
