import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class OrderService extends BaseService<Order, CreateOrderDto, UpdateOrderDto> {
  constructor(private readonly entityRepository: OrderRepository) {
    super(entityRepository);
  }

  async create(createDto: CreateOrderDto): Promise<Order> {
    return await this.entityRepository.criar(createDto as InferCreationAttributes<Order>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Order[]; count: number }> {
    const result = await this.entityRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }
}
