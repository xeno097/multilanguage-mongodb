import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GetRequestLanguage } from 'src/common/decorators/get-request-language.decorator';
import { LanguageCode } from 'src/common/enum/language-code.enum';
import { InputField } from 'src/common/graphql/enums/input-field.enum';
import { getEntityByIdArgOptions } from 'src/common/graphql/options/get-entity-by-id.options';
import { FeatureService } from './feature.service';
import { CreateFeatureInput } from './graphql/input-types/create-feature.input';
import { UpdateFeatureInput } from './graphql/input-types/update-feature.input';
import { Feature } from './graphql/object-types/feature.object-type';

@Resolver(() => Feature)
export class FeatureResolver {
  constructor(private readonly featureService: FeatureService) {}

  @Query(() => Feature)
  public async getFeatureById(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions)
    id: string,
  ) {
    return this.featureService.getEntityById({ id }, { language });
  }

  @Mutation(() => Feature)
  public async createFeature(
    @Args(InputField.INPUT) createFeatureInput: CreateFeatureInput,
  ) {
    return this.featureService.createEntity(createFeatureInput);
  }

  @Query(() => [Feature])
  public async getAllFeatures(@GetRequestLanguage() language: LanguageCode) {
    return this.featureService.getAllEntities({ language });
  }

  @Mutation(() => Feature)
  public async updateFeature(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.INPUT) updateFeatureInput: UpdateFeatureInput,
  ) {
    return this.featureService.updateEntity(updateFeatureInput, { language });
  }

  @Mutation(() => Feature)
  public async deleteFeature(
    @GetRequestLanguage() language: LanguageCode,
    @Args(InputField.ID, getEntityByIdArgOptions) id: string,
  ) {
    return this.featureService.deleteFeatureById({ id }, { language });
  }
}
