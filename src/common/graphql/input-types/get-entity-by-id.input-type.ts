import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetEntityByIdInput {
  @Field()
  id: string;
}
