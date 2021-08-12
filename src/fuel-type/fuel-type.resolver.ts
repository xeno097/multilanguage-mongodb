import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FuelTypeService } from './fuel-type.service';
import { FuelType } from './graphql/object-types/fuel-type.object-type';
import { CreateFuelTypeInput } from './graphql/input-types/create-fuel-type.input';
import { GetRequestLanguage } from 'src/common/decorators/get-request-language.decorator';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { InputField } from 'src/common/graphql/enums/input-field.enum';
import { getEntityByIdArgOptions } from 'src/common/graphql/options/get-entity-by-id.options';
import { UpdateFuelTypeInput } from './graphql/input-types/update-fuel-type.input';

@Resolver(() => FuelType)
export class FuelTypeResolver {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Query(() => FuelType)
  public async getFuelTypeById(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ) {
    return await this.fuelTypeService.getFuelTypeById({ id }, { language });
  }

  @Query(() => [FuelType])
  public async getAllFuelTypes(@GetRequestLanguage() language: LanguageCode) {
    return await this.fuelTypeService.getAllFuelTypes({ language });
  }

  @Mutation(() => FuelType)
  public async createFuelType(
    @Args(InputField.INPUT) createFuelTypeInput: CreateFuelTypeInput,
  ) {
    return await this.fuelTypeService.createFuelType(createFuelTypeInput);
  }

  @Mutation(() => FuelType)
  public async updateFuelType(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.INPUT) updateFuelTypeInput: UpdateFuelTypeInput,
  ) {
    return await this.fuelTypeService.updateFuelType(updateFuelTypeInput, {
      language,
    });
  }

  @Mutation(() => FuelType)
  public async deleteFuelType(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ) {
    return await this.fuelTypeService.deleteFuelTypeById({ id }, { language });
  }
}
