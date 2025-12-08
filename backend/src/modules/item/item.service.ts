import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { Item, TypeOrigin } from './entities/item.entity';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './repository/item.repository';
import { CarService } from '../car/car.service';
import { UserService } from '../user/user.service';
import { InferCreationAttributes } from 'sequelize';
import { CreateItemToCarDto } from './dto/create-item-to-car.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateItemToOrderDto } from './dto/create-item-to-order.dto';

@Injectable()
export class ItemService extends BaseService<Item, CreateItemDto, UpdateItemDto> {
  constructor(private readonly itemRepository: ItemRepository,
    @Inject(forwardRef(() => CarService))
    private readonly carService: CarService,
    private readonly userService: UserService) {
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

  async removeItem(itemId: string): Promise<void> {
    const item = await this.itemRepository.findById(itemId);
    if (!item) throw new ApiError('Item not found', 404);
    await this.remove(itemId);
  }

  async updateQuantity(itemId: string, newQuantity: number): Promise<Item> {
    const item = await this.itemRepository.getInstanceById(itemId);
    if (!item) throw new ApiError('Item not found', 404);
    item.quantProduct = newQuantity;
    await item.save();
    return item;
  }

  async updateOrigin(itemId: string): Promise<Item> {
    const item = await this.itemRepository.getInstanceById(itemId);
    if (!item) throw new ApiError('Item not found', 404);
    item.typeOrigin = TypeOrigin.PEDIDO;
    await item.save();
    return item;
  }

  async associateToOrder(itemId: string, orderId: string): Promise<Item> {
    const item = await this.itemRepository.getInstanceById(itemId);
    if (!item) throw new ApiError('Item not found', 404);
    item.orderId = orderId;
    await item.save();
    return item;
  }

  async createItemfromProductOriginCar(createItemToCarDto: CreateItemToCarDto): Promise<Item> {
    const newItemFromCar = { ...createItemToCarDto, typeOrigin: TypeOrigin.CAR } as InferCreationAttributes<Item>;
    const item = await this.itemRepository.criar(newItemFromCar);
    return item;
  }

  async createItemfromProductOriginOrder(createItemToCarDto: CreateItemToOrderDto): Promise<Item> {
    const newItemFromCar = { ...createItemToCarDto, typeOrigin: TypeOrigin.PEDIDO } as InferCreationAttributes<Item>;
    const item = await this.itemRepository.criar(newItemFromCar);
    return item;
  }

}
