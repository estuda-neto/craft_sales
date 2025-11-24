import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService extends BaseService<Product, CreateProductDto, UpdateProductDto> {
  constructor(private readonly productRepository: ProductRepository) {
    super(productRepository);
  }

  async create(createDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.criar(createDto as InferCreationAttributes<Product>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Product[]; count: number }> {
    const result = await this.productRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }
}
