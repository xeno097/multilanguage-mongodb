import { IUpdateEntityDto } from './update-entity-dto.interface';

export interface IRepository<T> {
  getOneEntity(getOneEntityDto: Record<string, any>): Promise<T>;
  getAllEntities(): Promise<T[]>;
  createEntity(createEntityDto: Record<string, any>): Promise<T>;
  updateEntity(updateEntityDto: IUpdateEntityDto): Promise<T>;
  deleteEntity(getOneEntityDto: Record<string, any>): Promise<T>;
}
