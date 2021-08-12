import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { UpdateModelPayload } from './update-model-payload.dto';

export class UpdateModelDto implements IUpdateEntityDto {
  where: GetEntityByIdDto;
  data: UpdateModelPayload;
}
