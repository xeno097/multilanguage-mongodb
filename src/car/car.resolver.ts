import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './graphql/object-types/car.object-type';
import { CreateCarInput } from './graphql/input-types/create-car.input';
import { UpdateCarInput } from './graphql/input-types/update-car.input';
import { GetRequestLanguage } from 'src/common/decorators/get-request-language.decorator';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { getEntityByIdArgOptions } from 'src/common/graphql/options/get-entity-by-id.options';
import { InputField } from 'src/common/graphql/enums/input-field.enum';

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query(() => Car)
  public async getCarById(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ): Promise<Car> {
    return await this.carService.findCarById({ id }, { language });
  }

  @Query(() => [Car])
  public async getAllCars(
    @GetRequestLanguage() language: LanguageCode,
  ): Promise<Car[]> {
    return await this.carService.getAllCars({ language });
  }

  @Mutation(() => Car)
  public async createCar(
    @Args(InputField.INPUT) createCarInput: CreateCarInput,
  ): Promise<Car> {
    return await await this.carService.createCar(createCarInput);
  }

  @Mutation(() => Car)
  public async updateCar(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.INPUT) updateCarInput: UpdateCarInput,
  ): Promise<Car> {
    return await this.carService.updateCar(updateCarInput, { language });
  }

  @Mutation(() => Car)
  public async deleteCar(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ): Promise<Car> {
    return await this.carService.deleteCarById({ id }, { language });
  }
}
