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
  constructor(private readonly itemRepository: ItemRepository) {
    super(itemRepository);
  }

  async create(createDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.criar(createDto as InferCreationAttributes<Item>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Item[]; count: number }> {
    const result = await this.itemRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }

  async findOneByCarIdAndItemId(carId: string, itemId: string) {
    return await this.itemRepository.findOneByCarIdAndItemId(carId, itemId);
  }

  async updateQuantity(itemId: string, newQuantity: number): Promise<Item> {
    const item = await this.itemRepository.getInstanceById(itemId);

    if (!item) throw new ApiError('Item not found', 404);

    item.quantProduct = newQuantity;
    await item.save();
    return item;
  }

  async removeItem(itemId: string): Promise<void> {
    const item = await this.itemRepository.findById(itemId);
    if (!item) throw new ApiError('Item not found', 404);
    await this.remove(itemId);
  }
}
