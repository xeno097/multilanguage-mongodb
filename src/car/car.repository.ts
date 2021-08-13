import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { IUpdateEntityDto } from 'src/common/interfaces/update-entity-dto.interface';
import { CarEntity } from './database/car.entity';
import { getCarAggregationPipeline } from './database/get-car-projection';
import { CarDto } from './dto/car.dto';
import { CreateCarDto } from './dto/create-car.dto';

export class CarRepository implements IRepository<CarDto> {
  constructor(
    @InjectModel(CarEntity.name)
    private readonly carEntityModel: Model<CarEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions = { language: LanguageCode.EN },
  ) {
    try {
      const { language } = requestOptions;
      const pipeline = [
        {
          $match: getOneEntityDto,
        },
        ...getCarAggregationPipeline(language),
      ];

      const [res] = await this.carEntityModel.aggregate(pipeline);

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
    const { language } = requestOptions;

    const pipeline = getCarAggregationPipeline(language);

    const res = await this.carEntityModel.aggregate(pipeline);

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

      await this.carEntityModel.findOneAndUpdate(where, data);

      const car = await this._getOneEntity(where, requestOptions);

      return car;
    } catch (error) {
      throw error;
    }
  }

  public async deleteEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<CarDto> {
    try {
      const car = await this._getOneEntity(getOneEntityDto, requestOptions);

      await this.carEntityModel.findOneAndRemove(getOneEntityDto);

      return car;
    } catch (error) {
      throw error;
    }
  }
}
