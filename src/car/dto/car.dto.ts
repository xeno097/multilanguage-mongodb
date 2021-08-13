import { FeatureDto } from 'src/feature/dto/feature.dto';
import { IFuelTypeDto } from 'src/fuel-type/interfaces/fuel-type-dto.interface';
import { ModelDto } from 'src/model/dto/model.dto.input';
import { ICarDto } from '../interfaces/car-dto.interface';

export class CarDto implements ICarDto {
  id: string;
  title: string;
  slug: string;
  carModel: ModelDto;
  fuelType: IFuelTypeDto;
  features: FeatureDto[];
}
