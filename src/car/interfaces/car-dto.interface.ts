import { IFeatureDto } from 'src/feature/interfaces/feature-dto.interface';
import { IFuelTypeDto } from 'src/fuel-type/interfaces/fuel-type-dto.interface';
import { IModelDto } from 'src/model/interfaces/model-dto.interface';

export interface ICarDto {
  id: string;
  title: string;
  slug: string;
  carModel: IModelDto;
  fuelType: IFuelTypeDto;
  features: IFeatureDto[];
}
