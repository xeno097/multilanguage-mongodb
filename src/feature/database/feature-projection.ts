import { LanguageCode } from 'src/common/enum/language-code.enum';

export const getFeatureProjection = (
  language: LanguageCode = LanguageCode.EN,
  prefix = '',
) => {
  const fieldPrefix = prefix !== '' ? `${prefix}.` : '';

  return {
    id: 1,
    name: {
      $cond: {
        if: {
          $ifNull: [`$${fieldPrefix}name_translations.${language}`, false],
        },
        then: `$${fieldPrefix}name_translations.${language}`,
        else: `$${fieldPrefix}name`,
      },
    },
    name_translations: 1,
    slug: 1,
  };
};
