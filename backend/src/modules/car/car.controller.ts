import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import { CheckCarDto } from './dto/check-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.carService.findAll();
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carService.update(id, updateCarDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.carService.remove(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENTE', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/user/:userId')
  async getUserCar(@Param('userId') userId: string) {
    return await this.carService.findCarOfUser(userId);
  }

  @Post('/car/checkout')
  async checkoutCar(@Body() updateCarDto: CheckCarDto) {
    return await this.carService.checkout(updateCarDto.carId, updateCarDto.userId);
  }


}
