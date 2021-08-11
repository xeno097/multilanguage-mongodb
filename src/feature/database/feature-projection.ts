import { LanguageCode } from 'src/common/enum/language-code.enum';

export const getFeatureProjection = (
  language: LanguageCode = LanguageCode.EN,
) => {
  return {
    id: 1,
    name: {
      $cond: {
        if: { $ifNull: [`$name_translations.${language}`, false] },
        then: `$name_translations.${language}`,
        else: '$name',
      },
    },
    name_translations: 1,
    slug: 1,
  };
};
