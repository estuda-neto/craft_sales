import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/pay')
  async payOrder(@Param('id') id: string, @Body() paymentDto: CreatePaymentDto) {
    return await this.orderService.paymentOrder(id, paymentDto);
  }

}
