import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCarPayloadInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => ID, { nullable: true })
  carModel?: string;

  @Field(() => [ID], { nullable: true })
  features?: string[];

  @Field(() => ID, { nullable: true })
  fuelType?: string;
}
