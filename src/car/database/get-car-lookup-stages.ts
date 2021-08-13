import { featureCollectionName } from 'src/feature/database/feature.entity';
import { fuelTypeCollectionName } from 'src/fuel-type/database/fuel-type.entity';
import { modelCollectionName } from 'src/model/database/model.entity';

export const getCarLookUpStages = (): any[] => {
  return [
    {
      $lookup: {
        from: modelCollectionName,
        localField: 'carModel',
        foreignField: '_id',
        as: 'carModel',
      },
    },
    {
      $lookup: {
        from: featureCollectionName,
        localField: 'features',
        foreignField: '_id',
        as: 'features',
      },
    },
    {
      $lookup: {
        from: fuelTypeCollectionName,
        localField: 'fuelType',
        foreignField: '_id',
        as: 'fuelType',
      },
    },
  ];
};
