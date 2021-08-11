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
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';

@Injectable()
export class FeatureService {
  constructor(
    @Inject(FeatureRepository.name)
    private readonly repository: IRepository<FeatureDto>,
  ) {}

  public async getEntityById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ): Promise<FeatureDto> {
    return await this.repository.getOneEntity(getEntityByIdDto, requestOptions);
  }

  public async getAllEntities(requestOptions: IRequestOptions) {
    return await this.repository.getAllEntities(requestOptions);
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

  public async updateEntity(
    updateFeatureInput: UpdateFeatureInput,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.updateEntity(
      updateFeatureInput,
      requestOptions,
    );
  }

  public async deleteFeatureById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.deleteEntity(getEntityByIdDto, requestOptions);
  }
}
