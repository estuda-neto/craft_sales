import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarRepository } from './repository/car.repository';

@Injectable()
export class CarService extends BaseService<Car, CreateCarDto, UpdateCarDto> {
  constructor(private readonly entityRepository: CarRepository) {
    super(entityRepository);
  }

  async create(createDto: CreateCarDto): Promise<Car> {
    return await this.entityRepository.criar(createDto as InferCreationAttributes<Car>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Car[]; count: number }> {
    const result = await this.entityRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }

}
