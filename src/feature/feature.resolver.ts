import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
    @Args(InputField.ID, getEntityByIdArgOptions) id: string,
  ) {
    return this.featureService.getEntityById({ id });
  }

  @Mutation(() => Feature)
  public async createFeature(
    @Args(InputField.INPUT) createFeatureInput: CreateFeatureInput,
  ) {
    return this.featureService.createEntity(createFeatureInput);
  }

  @Query(() => [Feature])
  public async getAllFeatures() {
    return this.featureService.getAllEntities();
  }

  @Mutation(() => Feature)
  public async updateFeature(
    @Args(InputField.INPUT) updateFeatureInput: UpdateFeatureInput,
  ) {
    return this.featureService.updateEntity(updateFeatureInput);
  }

  @Mutation(() => Feature)
  public async deleteFeature(
    @Args(InputField.ID, getEntityByIdArgOptions) id: string,
  ) {
    return this.featureService.deleteFeatureById({ id });
  }
}
