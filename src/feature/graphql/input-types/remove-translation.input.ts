import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/graphql/input-types/get-entity-by-id.input-type';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { RemoveFeatureTranslationPayload } from './remove-feature-translation-payload.input';

@InputType()
export class RemoveFeatureTranslations implements IUpdateEntityDto {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: RemoveFeatureTranslationPayload;
}
