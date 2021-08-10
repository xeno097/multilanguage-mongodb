import { LanguageCode } from 'src/common/enum/language-code.enum';

export const getFeatureProjection = (
  language: LanguageCode = LanguageCode.EN,
) => {
  return {
    id: 1,
    name: `$name_translations.${language}`,
    slug: 1,
  };
};
