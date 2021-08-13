import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { ModelEntity } from './database/model.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { ModelDto } from './dto/model.dto.input';

export class ModelRepository implements IRepository<ModelDto> {
  constructor(
    @InjectModel(ModelEntity.name)
    private readonly modelEntityModel: Model<ModelEntity>,
  ) {}
  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<ModelEntity> {
    try {
      const res = await this.modelEntityModel.findOne(getOneEntityDto);

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
  ): Promise<ModelDto> {
    return await this._getOneEntity(getOneEntityDto, requestOptions);
  }

  public async getAllEntities(
    requestOptions: IRequestOptions,
  ): Promise<ModelDto[]> {
    const query = this.modelEntityModel.find();

    return await query.exec();
  }

  public async createEntity(
    createEntityDto: CreateModelDto,
  ): Promise<ModelDto> {
    try {
      const entity = new this.modelEntityModel(createEntityDto);

      await entity.save();

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async updateEntity(
    updateEntityDto: IUpdateEntityDto,
    requestOptions: IRequestOptions,
  ): Promise<ModelDto> {
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
  ): Promise<ModelDto> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto, requestOptions);

      await entity.remove();

      return entity;
    } catch (error) {
      throw error;
    }
  }
}
