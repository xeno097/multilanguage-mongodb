import { LanguageCode } from 'src/common/enum/language-code.enum';

export const getFuelTypeEntityProjection = (
  language: LanguageCode = LanguageCode.EN,
  prefix = '',
) => {
  const fieldPrefix = prefix !== '' ? `${prefix}.` : '';

  return {
    id: `$${fieldPrefix}id`,
    name: {
      $cond: {
        if: {
          $ifNull: [`$${fieldPrefix}name_translations.${language}`, false],
        },
        then: `$${fieldPrefix}name_translations.${language}`,
        else: `$${fieldPrefix}name`,
      },
    },
    name_translations: `$${fieldPrefix}name_translations`,
    slug: `$${fieldPrefix}slug`,
  };
};
