import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { CarRepository } from './repository/car.repository';
import { ItemModule } from '../item/item.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [SequelizeModule.forFeature([Car]), ItemModule, ProductModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule { }
