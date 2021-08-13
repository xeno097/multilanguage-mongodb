import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetEntityByIdInput {
  @Field(() => ID)
  id: string;
}
