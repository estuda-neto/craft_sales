import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarRepository } from './repository/car.repository';
import { RegisterItemToCarDto } from './dto/register_item-car.dto';
import { ItemService } from '../item/item.service';
import { Item, TypeOrigin } from '../item/entities/item.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CarService extends BaseService<Car, CreateCarDto, UpdateCarDto> {
  constructor(private readonly carRepository: CarRepository, private readonly itemService: ItemService, private readonly productService: ProductService) {
    super(carRepository);
  }

  async create(createDto: CreateCarDto): Promise<Car> {
    return await this.carRepository.criar(createDto as InferCreationAttributes<Car>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Car[]; count: number }> {
    const result = await this.carRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }

  //TODO: test
  async registerItem(registerItemToCarDto: RegisterItemToCarDto): Promise<Car> {
    const { itemId, carId, productId, quantProduct, sizeVariation } = registerItemToCarDto;

    // verifica se o carrinho existe
    const car = await this.carRepository.findById(carId);
    if (!car) throw new ApiError('Car not found', 404);

    // verifica se o item já existe no carrinho
    const existingItem = await this.itemService.findOneByCarIdAndItemId(carId, itemId);

    if (existingItem) {
      existingItem.quantProduct += quantProduct;
      await this.itemService.update(existingItem.itemId, existingItem);
      const carUpdated = await this.carRepository.findByIdWithItems(carId);
      if (!carUpdated) throw new ApiError('Car not found after item update', 400);
      return carUpdated;
    }

    // cria novo item no carrinho, COM ORIGEM CAR
    const newItem: Partial<Item> = { sizeVariation, typeOrigin: TypeOrigin.CAR, quantProduct, carId, productId };

    await this.itemService.create(newItem);
    const carUpdated = await this.carRepository.findByIdWithItems(carId);
    if (!carUpdated) throw new ApiError('Car not found after item update', 400);
    return carUpdated;
  }


}
