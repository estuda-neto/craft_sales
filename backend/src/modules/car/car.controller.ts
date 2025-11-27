import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { RegisterItemToCarDto } from './dto/register_item-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carService.create(createCarDto);
  }

  @Post(':id/items')
  async addProductToCar(@Body() registerItemToCarDto: RegisterItemToCarDto) {
    return await this.carService.registerItem(registerItemToCarDto);
  }

  @Get()
  async findAll() {
    return await this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.carService.remove(id);
  }
}
