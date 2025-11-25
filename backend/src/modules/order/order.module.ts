import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderRepository } from './repository/order.repository';
import { EfiService } from './efi.service';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, EfiService],
  exports: [OrderService],
})
export class OrderModule { }
