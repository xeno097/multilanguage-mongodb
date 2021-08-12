import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ModelService } from './model.service';
import { CreateModelInput } from './graphql/input-types/create-model.input';
import { GetRequestLanguage } from 'src/common/decorators/get-request-language.decorator';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { InputField } from 'src/common/graphql/enums/input-field.enum';
import { getEntityByIdArgOptions } from 'src/common/graphql/options/get-entity-by-id.options';
import { UpdateModelInput } from './graphql/input-types/update-model.input';
import { Model } from './graphql/object-types/model.object-type';

@Resolver(() => Model)
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Query(() => Model)
  getModelById(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ) {
    return this.modelService.getModelById({ id }, { language });
  }

  @Query(() => [Model])
  getAllModels(@GetRequestLanguage() language: LanguageCode) {
    return this.modelService.getAllModels({ language });
  }

  @Mutation(() => Model)
  createModel(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.INPUT) createModelInput: CreateModelInput,
  ) {
    return this.modelService.createModel(createModelInput);
  }

  @Mutation(() => Model)
  updateModel(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.INPUT) updateModelInput: UpdateModelInput,
  ) {
    return this.modelService.updateModel(updateModelInput, { language });
  }

  @Mutation(() => Model)
  deleteModel(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ) {
    return this.modelService.deleteModelById({ id }, { language });
  }
}
