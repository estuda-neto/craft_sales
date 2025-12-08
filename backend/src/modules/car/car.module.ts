import { forwardRef, Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { CarRepository } from './repository/car.repository';
import { ItemModule } from '../item/item.module';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [SequelizeModule.forFeature([Car]), OrderModule, forwardRef(() => ItemModule), forwardRef(() => UserModule)],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService]
})
export class CarModule { }
