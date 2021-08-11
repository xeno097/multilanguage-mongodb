import { LanguageCode } from 'src/common/enum/language-code.enum';

export const getFeatureProjection = (
  language: LanguageCode = LanguageCode.EN,
) => {
  return {
    id: 1,
    name: {
      $cond: {
        if: `$name_translations.${language}`,
        then: '$name_translations.es',
        else: '$name_translations.en',
      },
    },
    slug: 1,
  };
};
