import { InjectModel } from '@nestjs/mongoose';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { CarEntity, CarEntityModel } from './database/car.entity';
import { CarDto } from './dto/car.dto';
import { CreateCarDto } from './dto/create-car.dto';

export class CarRepository implements IRepository<CarDto> {
  constructor(
    @InjectModel(CarEntity.name)
    private readonly carEntityModel: CarEntityModel,
  ) {}
  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions = { language: LanguageCode.EN },
  ): Promise<CarEntity> {
    try {
      const query = this.carEntityModel.findOne(getOneEntityDto);

      const res = await this.carEntityModel
        .buildProjection(query, requestOptions.language)
        .exec();

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
  ): Promise<CarDto> {
    const res = await this._getOneEntity(getOneEntityDto, requestOptions);

    return res;
  }

  public async getAllEntities(
    requestOptions: IRequestOptions,
  ): Promise<CarDto[]> {
    const query = this.carEntityModel.find();

    const res = await this.carEntityModel
      .buildProjection(query, requestOptions.language)
      .exec();

    return res;
  }

  public async createEntity(createEntityDto: CreateCarDto): Promise<CarDto> {
    try {
      const entity = new this.carEntityModel(createEntityDto);

      await entity.save();

      const getOneEntityDto = { id: entity.id };

      const car = await this._getOneEntity(getOneEntityDto);

      return car;
    } catch (error) {
      throw error;
    }
  }

  public async updateEntity(
    updateEntityDto: IUpdateEntityDto,
    requestOptions: IRequestOptions,
  ): Promise<CarDto> {
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
  ): Promise<CarDto> {
    try {
      const entity = await this._getOneEntity(getOneEntityDto, requestOptions);

      await entity.remove();

      return entity;
    } catch (error) {
      throw error;
    }
  }
}
