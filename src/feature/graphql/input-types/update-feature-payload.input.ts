import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFeaturePayloadInput {
  @Field({ nullable: true })
  name?: string;
}
