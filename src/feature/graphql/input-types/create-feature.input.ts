import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFeatureInput {
  @Field()
  name: string;
}
