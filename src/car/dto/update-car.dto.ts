import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { UpdateCarPayload } from './update-car-payload.dto';

export class UpdateCarDto implements IUpdateEntityDto {
  where: GetEntityByIdDto;
  data: UpdateCarPayload;
}
