import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { getFeatureProjection } from './database/feature-projection';
import { FeatureEntity } from './database/feature.entity';
import { CreateFeatureInternalDto } from './dto/create-feature-internal.dto';
import { FeatureDto } from './dto/feature.dto';

export class FeatureRepository implements IRepository<FeatureDto> {
  constructor(
    @InjectModel(FeatureEntity.name)
    private readonly featureEntityModel: Model<FeatureEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<FeatureEntity> {
    try {
      const { language } = requestOptions;

      const res = await this.featureEntityModel.findOne(
        getOneEntityDto,
        getFeatureProjection(language),
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
  ): Promise<FeatureDto> {
    return await this._getOneEntity(getOneEntityDto, requestOptions);
  }

  public async getAllEntities(
    requestOptions: IRequestOptions,
  ): Promise<FeatureDto[]> {
    const { language } = requestOptions;
    const query = this.featureEntityModel.find();

    query.projection(getFeatureProjection(language));

    return await query.exec();
  }

  public async createEntity(
    createEntityDto: CreateFeatureInternalDto,
  ): Promise<FeatureDto> {
    try {
      const entity = new this.featureEntityModel(createEntityDto);

      await entity.save();

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async updateEntity(
    updateEntityDto: IUpdateEntityDto,
    requestOptions: IRequestOptions,
  ): Promise<FeatureDto> {
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
  ): Promise<FeatureDto> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto, requestOptions);

      await entity.remove();

      return entity;
    } catch (error) {
      throw error;
    }
  }
}
