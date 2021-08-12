import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { FuelTypeEntity } from './database/fuel-type.entity';
import { getFuelTypeEntityProjection } from './database/get-fuel-type-projection';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { FuelTypeDto } from './dto/fuel-type.dto';

export class FuelTypeRepository implements IRepository<FuelTypeDto> {
  constructor(
    @InjectModel(FuelTypeEntity.name)
    private readonly fuelTypeEntityModel: Model<FuelTypeEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<FuelTypeEntity> {
    try {
      const { language } = requestOptions;

      const res = await this.fuelTypeEntityModel.findOne(
        getOneEntityDto,
        getFuelTypeEntityProjection(language),
      );

      if (!res) {
        throw new Error('Not Found');
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<FuelTypeDto> {
    return await this._getOneEntity(getOneEntityDto, requestOptions);
  }

  public async getAllEntities(
    requestOptions: IRequestOptions,
  ): Promise<FuelTypeDto[]> {
    const { language } = requestOptions;
    const query = this.fuelTypeEntityModel.find();

    query.projection(getFuelTypeEntityProjection(language));

    return await query.exec();
  }

  public async createEntity(
    createEntityDto: CreateFuelTypeDto,
  ): Promise<FuelTypeDto> {
    try {
      const entity = new this.fuelTypeEntityModel(createEntityDto);

      await entity.save();

      entity.name = entity.name_translations.en;

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async updateEntity(
    updateEntityDto: IUpdateEntityDto,
    requestOptions: IRequestOptions,
  ): Promise<FuelTypeDto> {
    try {
      const { data, where } = updateEntityDto;
      const { language } = requestOptions;
      const entity = await this._getOneEntity(where, requestOptions);

      // Add the new translations to the old ones
      const name_translations = {
        ...entity.name_translations,
        ...data.name_translations,
      };

      const updatePayload = {
        ...data,
        name_translations,
      };

      entity.set(updatePayload);

      await entity.save();

      // Set the field to the correct traslation if exists
      entity.name = name_translations[language] ?? entity.name;

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async deleteEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<FuelTypeDto> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto, requestOptions);

      await entity.remove();

      return entity;
    } catch (error) {
      throw error;
    }
  }
}
