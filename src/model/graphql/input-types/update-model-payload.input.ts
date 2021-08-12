import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateModelPayloadInput {
  @Field()
  name: string;
}
