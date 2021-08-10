import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/common/interfaces/repository.interface';
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
  ): Promise<Feature> {
    try {
      const res = await this.featureModel.findOne(
        getOneEntityDto,
        getFeatureProjection(),
      );

      if (!res) {
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<FeatureDto> {
    return await this._getOneEntity(getOneEntityDto);
  }

  public async getAllEntities(): Promise<FeatureDto[]> {
    const query = this.featureModel.find();

    query.projection(getFeatureProjection());

    return await query.exec();
  }

  public async createEntity(
    createEntityDto: CreateFeatureInternalDto,
  ): Promise<FeatureDto> {
    try {
      const entity = new this.featureModel(createEntityDto);

      await entity.save();

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async updateEntity(
    updateEntityDto: IUpdateEntityDto,
  ): Promise<FeatureDto> {
    try {
      const { data, where } = updateEntityDto;
      const entity = await this._getOneEntity(where);

      entity.set(data);

      await entity.save();

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async deleteEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<FeatureDto> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto);

      await entity.remove();

      return entity;
    } catch (error) {
      throw error;
    }
  }
}
