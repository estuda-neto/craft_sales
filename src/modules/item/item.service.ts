import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './repository/item.repository';

@Injectable()
export class ItemService extends BaseService<Item, CreateItemDto, UpdateItemDto> {
  constructor(private readonly entityRepository: ItemRepository) {
    super(entityRepository);
  }

  async create(createDto: CreateItemDto): Promise<Item> {
    return await this.entityRepository.criar(createDto as InferCreationAttributes<Item>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Item[]; count: number }> {
    const result = await this.entityRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }
}
