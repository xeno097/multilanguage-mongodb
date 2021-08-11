import { IRequestOptions } from './request-options.interface';
import { IUpdateEntityDto } from './update-entity-dto.interface';

export interface IRepository<T> {
  getOneEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<T>;
  getAllEntities(requestOptions: IRequestOptions): Promise<T[]>;
  createEntity(createEntityDto: Record<string, any>): Promise<T>;
  updateEntity(
    updateEntityDto: IUpdateEntityDto,
    requestOptions: IRequestOptions,
  ): Promise<T>;
  deleteEntity(
    getOneEntityDto: Record<string, any>,
    requestOptions: IRequestOptions,
  ): Promise<T>;
}
