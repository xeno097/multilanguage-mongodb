import { Inject, Injectable } from '@nestjs/common';
import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { createSlug } from 'src/common/functions/create-slug.function';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { CreateModelDto } from './dto/create-model.dto';

import { ModelDto } from './dto/model.dto.input';
import { UpdateModelDto } from './dto/update-model.input';
import { CreateModelInput } from './graphql/input-types/create-model.input';
import { ModelRepository } from './model.repository';

@Injectable()
export class ModelService {
  constructor(
    @Inject(ModelRepository.name)
    private readonly repository: IRepository<ModelDto>,
  ) {}

  public async getModelById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.getOneEntity(getEntityByIdDto, requestOptions);
  }

  public async createModel(createModelDto: CreateModelInput) {
    const { name } = createModelDto;

    const createModelInternalDto: CreateModelDto = {
      name,
      slug: createSlug([name]),
    };

    return await this.repository.createEntity(createModelInternalDto);
  }

  public async getAllModels(requestOptions: IRequestOptions) {
    return await this.repository.getAllEntities(requestOptions);
  }

  public async updateModel(
    updateModelDto: UpdateModelDto,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.updateEntity(updateModelDto, requestOptions);
  }

  public async deleteModelById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.deleteEntity(getEntityByIdDto, requestOptions);
  }
}
