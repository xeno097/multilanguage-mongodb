import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { getFeatureProjection } from './database/feature-projection';
import { Feature } from './database/feature.entity';
import { CreateFeatureInternalDto } from './dto/create-feature-internal.dto';
import { FeatureDto } from './dto/feature.dto';

export class FeatureRepository implements IRepository<FeatureDto> {
  constructor(
    @InjectModel(Feature.name) private readonly featureModel: Model<Feature>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<Feature> {
    try {
      const { language } = requestOptions;

      const res = await this.featureModel.findOne(
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
    const query = this.featureModel.find();

    query.projection(getFeatureProjection(language));

    return await query.exec();
  }

  public async createEntity(
    createEntityDto: CreateFeatureInternalDto,
  ): Promise<FeatureDto> {
    try {
      const entity = new this.featureModel(createEntityDto);

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
  ): Promise<FeatureDto> {
    try {
      const { data, where } = updateEntityDto;
      const entity = await this._getOneEntity(where, requestOptions);

      entity.set(data);

      await entity.save();

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
