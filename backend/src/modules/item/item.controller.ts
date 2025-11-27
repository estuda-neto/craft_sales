import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  // Criar item (em teoria usado pelo CartService, mas pode deixar aqui)
  // @Post()
  // async create(@Body() createItemDto: CreateItemDto) {
  //   return await this.itemService.create(createItemDto);
  // }

  @Get()
  async findAll() {
    return await this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemService.findOne(id);
  }

  // Atualizar tudo do item (não recomendado pra ecommerce, mas deixamos por padrão)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  @Patch(':id/quantity/:quantity')
  async updateQuantity(
    @Param('id') itemId: string,
    @Param('quantity') quantity: number,
  ) {
    return await this.itemService.updateQuantity(itemId, Number(quantity));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemService.removeItem(id);
  }
}
