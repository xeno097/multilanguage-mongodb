import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/graphql/input-types/get-entity-by-id.input-type';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { RemoveFuelTypeTranslationsPayload } from './remove-fuel-type-translations-payload.input';

@InputType()
export class RemoveFuelTypeTranslationInput implements IUpdateEntityDto {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: RemoveFuelTypeTranslationsPayload;
}
