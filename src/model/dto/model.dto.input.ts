import { IModelDto } from '../interfaces/model-dto.interface';

export class ModelDto implements IModelDto {
  id: string;
  name: string;
  slug: string;
}
