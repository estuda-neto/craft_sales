import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  @Get('final-price')
  async findAllWithFinalPrice() {
    return await this.productService.findAllWithFinalPrice();
  }

  @Get(':id/final-price')
  async findOneWithFinalPrice(@Param('id') id: string) {
    return await this.productService.findOneWithFinalPrice(id);
  }

  @Get('filter/on-sale')
  async findProductsOnSale() {
    return await this.productService.findProductsOnSale();
  }

  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return await this.productService.updateStock(id, quantity);
  }
}
