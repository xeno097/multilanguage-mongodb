import { Inject, Injectable } from '@nestjs/common';
import { GetEntityByIdDto } from 'src/common/dto/get-entity-by-id.dto';
import { createSlug } from 'src/common/functions/create-slug.function';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { IRequestOptions } from 'src/common/interfaces/request-options.interface';
import { CarRepository } from './car.repository';
import { CarDto } from './dto/car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { CreateCarInput } from './graphql/input-types/create-car.input';
import { UpdateCarInput } from './graphql/input-types/update-car.input';
import { ICarDto } from './interfaces/car-dto.interface';

@Injectable()
export class CarService {
  constructor(
    @Inject(CarRepository.name)
    private readonly repository: IRepository<ICarDto>,
  ) {}

  public async findCarById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ): Promise<CarDto> {
    return await this.repository.getOneEntity(getEntityByIdDto, requestOptions);
  }

  public async getAllCars(requestOptions: IRequestOptions): Promise<CarDto[]> {
    return await this.repository.getAllEntities(requestOptions);
  }

  public async createCar(createCarInput: CreateCarInput): Promise<CarDto> {
    const { carModel, features, title } = createCarInput;

    const createCarDto: CreateCarDto = {
      carModel,
      features,
      title,
      slug: createSlug([title], true),
    };

    return await this.repository.createEntity(createCarDto);
  }

  public async updateCar(
    updateCarInput: UpdateCarInput,
    requestOptions: IRequestOptions,
  ): Promise<CarDto> {
    return await this.repository.updateEntity(updateCarInput, requestOptions);
  }

  public async deleteCarById(
    getEntityByIdDto: GetEntityByIdDto,
    requestOptions: IRequestOptions,
  ): Promise<CarDto> {
    return await this.repository.deleteEntity(getEntityByIdDto, requestOptions);
  }
}
