import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { CarRepository } from './repository/car.repository';

@Module({
  imports:[SequelizeModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
