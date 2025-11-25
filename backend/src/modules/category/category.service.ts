import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(private readonly entityRepository: CategoryRepository) {
    super(entityRepository);
  }

  async create(createDto: CreateCategoryDto): Promise<Category> {
    return await this.entityRepository.criar(createDto as InferCreationAttributes<Category>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Category[]; count: number }> {
    const result = await this.entityRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }

}
