import { LanguageCode } from 'src/common/enum/language-code.enum';

export class CreateFuelTypeDto {
  name: string;
  slug: string;
  name_translations: {
    [LanguageCode.EN]: string;
  };
}
