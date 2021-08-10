import { Inject, Injectable } from '@nestjs/common';
import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { FeatureDto } from './dto/feature.dto';
import { FeatureRepository } from './feature.repository';
import { CreateFeatureInput } from './graphql/input-types/create-feature.input';
import { UpdateFeatureInput } from './graphql/input-types/update-feature.input';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { CreateFeatureInternalDto } from './dto/create-feature-internal.dto';
import { createSlug } from 'src/common/functions/create-slug.function';

@Injectable()
export class FeatureService {
  constructor(
    @Inject(FeatureRepository.name)
    private readonly repository: IRepository<FeatureDto>,
  ) {}

  public async getEntityById(
    getEntityByIdDto: GetEntityByIdDto,
  ): Promise<FeatureDto> {
    return await this.repository.getOneEntity(getEntityByIdDto);
  }

  public async getAllEntities() {
    return await this.repository.getAllEntities();
  }

  public async createEntity(createFeatureInput: CreateFeatureInput) {
    const { name } = createFeatureInput;

    const createFeatureDto: CreateFeatureInternalDto = {
      name,
      slug: createSlug([name]),
      name_translations: {
        [LanguageCode.EN]: name,
      },
    };

    return await this.repository.createEntity(createFeatureDto);
  }

  public async updateEntity(updateFeatureInput: UpdateFeatureInput) {
    return await this.repository.updateEntity(updateFeatureInput);
  }

  public async deleteFeatureById(getEntityByIdDto: GetEntityByIdDto) {
    return await this.repository.deleteEntity(getEntityByIdDto);
  }
}
