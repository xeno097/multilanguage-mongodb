import { IFuelTypeDto } from '../interfaces/fuel-type-dto.interface';

export class FuelTypeDto implements IFuelTypeDto {
  id: string;
  name: string;
  slug: string;
}
