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

  // Calcular preço final com desconto
  private calculateFinalPrice(product: Product) {
    if (product.onSale && product.discountpercentage > 0) {
      return product.price - (product.price * product.discountpercentage);
    }
    return product.price;
  }

  // Retorna todos os produtos já com preço final
  async findAllWithFinalPrice() {
    const products = await this.productRepository.findAll();
    return products.map(p => ({
      ...p.get({ plain: true }),
      finalPrice: this.calculateFinalPrice(p)
    }));
  }

  // Retorna um único produto já com preço final
  async findOneWithFinalPrice(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new ApiError("Product not found", 404);
    product.price = this.calculateFinalPrice(product);

    return product;
  }

  // Apenas produtos em promoção
  async findProductsOnSale() {
    const products = await this.productRepository.findOnSale();
    return products.map(p => ({ ...p.get({ plain: true }), finalPrice: this.calculateFinalPrice(p) }));
  }

  // Atualizar estoque
  async updateStock(productId: string, quantity: number) {
    const product = await this.productRepository.getInstanceById(productId);
    if (!product) throw new ApiError("Product not found", 404);

    product.quantStock = quantity;
    await product.save();
    return product;
  }
}
