import { IFeatureDto } from '../interfaces/feature-dto.interface';

export class FeatureDto implements IFeatureDto {
  id: string;
  name: string;
  slug: string;
}
