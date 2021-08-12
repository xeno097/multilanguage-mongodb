import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/graphql/input-types/get-entity-by-id.input-type';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { UpdateModelPayloadInput } from './update-model-payload.input';

@InputType()
export class UpdateModelInput implements IUpdateEntityDto {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateModelPayloadInput;
}
