import { InputType, Field } from '@nestjs/graphql';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { GetEntityByIdInput } from 'src/common/graphql/input-types/get-entity-by-id.input-type';
import { UpdateCarPayloadInput } from './update-car-payload.input';

@InputType()
export class UpdateCarInput implements IUpdateEntityDto {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateCarPayloadInput;
}
