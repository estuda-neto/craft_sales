import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { ProductCategory } from './entities/productcategory.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category,ProductCategory])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule { }
