import { LanguageCode } from 'src/common/enum/language-code.enum';

export class CreateFeatureInternalDto {
  name: string;
  slug: string;
  name_translations: {
    [LanguageCode.EN]: string;
  };
}
