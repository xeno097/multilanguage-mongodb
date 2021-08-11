import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/graphql/input-types/get-entity-by-id.input-type';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { UpdateFeaturePayloadInput } from './update-feature-payload.input';

@InputType()
export class UpdateFeatureInput implements IUpdateEntityDto {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateFeaturePayloadInput;
}
