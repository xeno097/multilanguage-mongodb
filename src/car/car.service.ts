import { Injectable } from '@nestjs/common';
import { CreateCarInput } from './graphql/input-types/create-car.input';
import { UpdateCarInput } from './graphql/input-types/update-car.input';

@Injectable()
export class CarService {
  create(createCarInput: CreateCarInput) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarInput: UpdateCarInput) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
