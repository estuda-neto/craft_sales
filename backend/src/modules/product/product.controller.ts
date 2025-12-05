import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import type { FastifyRequest } from 'fastify';
import { ApiError } from 'src/common/errors/apierror.class';
import { extname, join } from 'path';
import * as fs from 'fs/promises';

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

  @Get('user/:userId')
  async findOfUserId(@Param('userId') id: string) {
    return await this.productService.findAllOfUser(id);
  }

  @Get('filter')
  async filterProducts(@Query('category') category?: string, @Query('min') min?: number, @Query('max') max?: number, @Query('onSale') onSale?: string) {
    return await this.productService.filterProducts({ category, min, max, onSale });
  }

  @Get('filter/on-sale')
  async findProductsOnSale() {
    return await this.productService.findProductsOnSale();
  }

  @Get('filter/checked')
  async findAllChecked() {
    return await this.productService.findProductsChecked();
  }

  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return await this.productService.updateStock(id, quantity);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'ARTESAO')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/photo')
  @ApiConsumes('multipart/form-data')
  async uploadPhoto(@Param('id') id: string, @Req() req: FastifyRequest) {
    const file = await req.file();
    if (!file) throw new ApiError('No photo sent', 400);

    const buffer = await file.toBuffer();
    const ext = extname(file.filename);
    const newName = `photo-${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

    const uploadDir = join(process.cwd(), 'uploads/products');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadPath = join(uploadDir, newName);
    await fs.writeFile(uploadPath, buffer);

    const filePath = `/uploads/products/${newName}`;

    return await this.productService.addPhoto(id, filePath);
  }

}
