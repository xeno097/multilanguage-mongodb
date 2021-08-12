import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/graphql/input-types/get-entity-by-id.input-type';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { UpdateFuelTypePayloadInput } from './update-fuel-type-payload.input';

@InputType()
export class UpdateFuelTypeInput implements IUpdateEntityDto {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateFuelTypePayloadInput;
}
