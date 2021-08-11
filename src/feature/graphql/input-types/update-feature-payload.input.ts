import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateFeaturePayloadInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  name_translations?: Record<string, string>;
}
