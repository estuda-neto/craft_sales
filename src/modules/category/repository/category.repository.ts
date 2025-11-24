import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {

  constructor( @InjectModel(Category) private readonly CategoryModel: typeof Category) {
    super(CategoryModel);
  }

  async criar(data: InferCreationAttributes<Category>): Promise<Category> {
    return await this.create(data);
  }

  async buscarTodos(): Promise<Category[]> {
    return await this.findAll();
  }

  async findById(id: string): Promise<Partial<Category> | null> {
    const result = await this.CategoryModel.findByPk(id);
    return result?.get({ plain: true }) ?? null;
  }

  async getInstanceById(id: string): Promise<Category | null> {
    return await this.CategoryModel.findByPk(id);
  }
}
