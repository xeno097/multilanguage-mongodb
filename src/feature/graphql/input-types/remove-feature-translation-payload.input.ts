import { Field, InputType } from '@nestjs/graphql';
import { LanguageCode } from 'src/common/enum/language-code.enum';

@InputType()
export class RemoveFeatureTranslationPayload {
  @Field(() => [LanguageCode])
  name_translations: LanguageCode[];
}
