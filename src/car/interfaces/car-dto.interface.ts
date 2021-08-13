import { IFeatureDto } from 'src/feature/interfaces/feature-dto.interface';
import { IModelDto } from 'src/model/interfaces/model-dto.interface';

export interface ICarDto {
  id: string;
  title: string;
  slug: string;
  carModel: IModelDto;
  features: IFeatureDto[];
}
