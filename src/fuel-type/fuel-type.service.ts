import { Inject, Injectable } from '@nestjs/common';
import { FuelTypeRepository } from './fuel-type.repository';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { FuelTypeDto } from './dto/fuel-type.dto';
import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { createSlug } from 'src/common/functions/create-slug.function';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeInput } from './graphql/input-types/update-fuel-type.input';
import { CreateFuelTypeInput } from './graphql/input-types/create-fuel-type.input';
import { RemoveFuelTypeTranslationInput } from './graphql/input-types/remove-fuel-type-translation.input';

@Injectable()
export class FuelTypeService {
  constructor(
    @Inject(FuelTypeRepository.name)
    private readonly repository: IRepository<FuelTypeDto>,
  ) {}

  public async getFuelTypeById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ): Promise<FuelTypeDto> {
    return await this.repository.getOneEntity(getEntityByIdDto, requestOptions);
  }

  public async getAllFuelTypes(requestOptions: IRequestOptions) {
    return await this.repository.getAllEntities(requestOptions);
  }

  public async createFuelType(createFuelTypeInput: CreateFuelTypeInput) {
    const { name } = createFuelTypeInput;

    const createFuelTypeDto: CreateFuelTypeDto = {
      name,
      slug: createSlug([name]),
      name_translations: {
        [LanguageCode.EN]: name,
      },
    };

    return await this.repository.createEntity(createFuelTypeDto);
  }

  public async updateFuelType(
    updateFuelTypeInput: UpdateFuelTypeInput,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.updateEntity(
      updateFuelTypeInput,
      requestOptions,
    );
  }

  public async deleteFuelTypeById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ) {
    return await this.repository.deleteEntity(getEntityByIdDto, requestOptions);
  }

  // EXTRA
  public async removeFuelTypeTranslations(
    removeFuelTypeTranslations: RemoveFuelTypeTranslationInput,
    requestOptions: IRequestOptions,
  ) {
    const { where, data } = removeFuelTypeTranslations;
    const { name_translations } = data;

    const updatePayload = {};
    name_translations.forEach((curr) => {
      updatePayload[curr] = null;
    });

    const updateFuelTypeDto: UpdateFuelTypeInput = {
      where,
      data: {
        name_translations: updatePayload,
      },
    };

    const res = await this.repository.updateEntity(
      updateFuelTypeDto,
      requestOptions,
    );

    return res;
  }
}
