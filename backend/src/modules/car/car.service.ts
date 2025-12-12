import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Car, CarStatus } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarRepository } from './repository/car.repository';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { OrderService } from '../order/order.service';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class CarService extends BaseService<Car, CreateCarDto, UpdateCarDto> {
  constructor(private readonly carRepository: CarRepository, private readonly userService: UserService, private readonly orderService: OrderService,
    @Inject(forwardRef(() => ItemService))
    private readonly itemService: ItemService) {
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

  async findCarOfUser(userId: string): Promise<Car> {
    const car = await this.carRepository.getCarOfUserWithUserId(userId);
    if (!car) throw new ApiError("car not found", 404)
    return car;
  }

  async checkout(carId: string, userId: string): Promise<Order> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ApiError("this user not found.", 404);

    const car = await this.carRepository.getInstanceById(carId);
    if (!car) throw new ApiError("this car not found.", 404);
    car.status = CarStatus.CLOSED;
    await car.save();

    const pedido = await this.orderService.create({
      name: `oder:${user.name}_${new Date()}`, code: "hashcodeNotImplemented", addressId: user.addressId, userId: user.userId
    } as CreateOrderDto);

    car.items?.forEach(async (item) => {
      const itemTemp = await this.itemService.updateOrigin(item.itemId);
      await this.itemService.associateToOrder(itemTemp.itemId, pedido.orderId);
    });
    return pedido;
  }

  async clearCar(carId: string, userId: string): Promise<Car> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ApiError("this user not found.", 404);

    await this.remove(carId);
    const newCar = await this.create({ name: `${user.name} user's shopping cart`, userId: user.userId } as CreateCarDto);
    return newCar;
  }

}
