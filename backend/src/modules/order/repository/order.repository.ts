import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "../entities/order.entity";
import { InferCreationAttributes } from "sequelize";
import { Item } from "src/modules/item/entities/item.entity";

@Injectable()
export class OrderRepository extends BaseRepository<Order> {

    constructor(@InjectModel(Order) private readonly orderModel: typeof Order) {
        super(orderModel);
    }

    async criar(data: InferCreationAttributes<Order>): Promise<Order> {
        return await this.create(data);
    }

    async buscarTodos(): Promise<Order[]> {
        return await this.findAll();
    }

    async findById(id: string): Promise<Partial<Order> | null> {
        const result = await this.orderModel.findByPk(id);
        return result?.get({ plain: true }) ?? null;
    }

    async getInstanceById(id: string): Promise<Order | null> {
        return await this.orderModel.findByPk(id);
    }
    async findByIdWithItems(id: string): Promise<Order | null> {
        return await this.orderModel.findByPk(id, { include: [Item], });
    }
}


