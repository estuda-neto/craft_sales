import { Controller, Get, Body, Patch, Param, Delete, Post, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemToCarDto } from './dto/create-item-to-car.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @ApiBearerAuth('jwt')
  @Roles('CLIENTE', 'ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createItemfromProducOriginCar(@Body() createItemWithProducts: CreateItemToCarDto) {
    return await this.itemService.createItemfromProductOriginCar(createItemWithProducts);
  }

  // @Patch(':id/typeOrigin')
  // async typeOrigin(@Param('id') itemId: string) {
  //   return await this.itemService.updateOrigin(itemId);
  // }

  @ApiBearerAuth('jwt')
  @Roles('CLIENTE', 'ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.itemService.findAll();
  }

  @ApiBearerAuth('jwt')
  @Roles('CLIENTE', 'ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('CLIENTE', 'ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  @ApiBearerAuth('jwt')
  @Roles('CLIENTE', 'ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/quantity/:quantity')
  async updateQuantity(@Param('id') itemId: string, @Param('quantity') quantity: number) {
    return await this.itemService.updateQuantity(itemId, Number(quantity));
  }

  @ApiBearerAuth('jwt')
  @Roles('CLIENTE', 'ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemService.removeItem(id);
  }
}
