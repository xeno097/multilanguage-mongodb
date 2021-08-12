import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFuelTypeInput {
  @Field()
  name: string;
}
