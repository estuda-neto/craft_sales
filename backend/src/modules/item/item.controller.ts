import { Controller, Get, Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemToCarDto } from './dto/create-item-to-car.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  async createItemfromProducOriginCar(@Body() createItemWithProducts: CreateItemToCarDto) {
    return await this.itemService.createItemfromProductOriginCar(createItemWithProducts);
  }

  // @Patch(':id/typeOrigin')
  // async typeOrigin(@Param('id') itemId: string) {
  //   return await this.itemService.updateOrigin(itemId);
  // }


  @Get()
  async findAll() {
    return await this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  @Patch(':id/quantity/:quantity')
  async updateQuantity(@Param('id') itemId: string, @Param('quantity') quantity: number) {
    return await this.itemService.updateQuantity(itemId, Number(quantity));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemService.removeItem(id);
  }
}
