import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Car } from "../entities/car.entity";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";

@Injectable()
export class CarRepository extends BaseRepository<Car> {

    constructor(@InjectModel(Car) private readonly carModel: typeof Car) {
        super(carModel);
    }

    async criar(data: InferCreationAttributes<Car>): Promise<Car> {
        return await this.create(data);
    }

    async buscarTodos(): Promise<Car[]> {
        return await this.findAll();
    }

    async findById(id: string): Promise<Partial<Car> | null> {
        const result = await this.carModel.findByPk(id);
        return result?.get({ plain: true }) ?? null;
    }

    async getInstanceById(id: string): Promise<Car | null> {
        return await this.carModel.findByPk(id);
    }
}
