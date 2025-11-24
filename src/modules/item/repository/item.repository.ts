import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";
import { Item } from "../entities/item.entity";

@Injectable()
export class ItemRepository extends BaseRepository<Item> {

  constructor(@InjectModel(Item) private readonly itemModel: typeof Item) {
    super(itemModel);
  }

  async criar(data: InferCreationAttributes<Item>): Promise<Item> {
    return  await this.create(data);
  }

  async buscarTodos(): Promise<Item[]> {
    return await this.findAll();
  }

  async findById(id: string): Promise<Partial<Item> | null> {
    const result = await this.itemModel.findByPk(id);
    return result?.get({ plain: true }) ?? null;
  }

  async getInstanceById(id: string): Promise<Item | null> {
    return  await this.itemModel.findByPk(id);
  }
}
