import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { UpdateFeaturePayloadDto } from './update-fuel-type-payload.dto';

export class UpdateFuelTypeDto implements IUpdateEntityDto {
  where: GetEntityByIdDto;
  data: UpdateFeaturePayloadDto;
}
