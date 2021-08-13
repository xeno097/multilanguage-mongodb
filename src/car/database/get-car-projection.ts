import { LanguageCode } from 'src/common/enum/language-code.enum';
import { getFeatureProjection } from 'src/feature/database/feature-projection';
import { getFuelTypeEntityProjection } from 'src/fuel-type/database/get-fuel-type-projection';
import { getCarLookUpStages } from './get-car-lookup-stages';

export const getCarEntityProjection = (
  language: LanguageCode = LanguageCode.EN,
) => {
  return {
    id: 1,
    title: 1,
    slug: 1,
    carModel: 1,
    fuelType: getFuelTypeEntityProjection(language, 'fuelType'),
    features: {
      $map: {
        input: '$features',
        as: 'feature',
        // The `$` before the prefix variable is needed because
        // the `in` property uses variables instead of the document
        // value
        in: getFeatureProjection(language, '$feature'),
      },
    },
  };
};

export const getCarAggregationPipeline = (
  language: LanguageCode = LanguageCode.EN,
): any[] => {
  return [
    ...getCarLookUpStages(),
    {
      $project: {
        id: 1,
        title: 1,
        slug: 1,
        carModel: {
          $ifNull: [{ $arrayElemAt: ['$carModel', 0] }, null],
        },
        fuelType: {
          $ifNull: [{ $arrayElemAt: ['$fuelType', 0] }, null],
        },
        features: 1,
      },
    },
    {
      $project: getCarEntityProjection(language),
    },
  ];
};
