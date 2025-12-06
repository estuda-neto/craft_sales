import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";
import { BaseRepository } from "src/common/base/base.repository";
import { Midia, TypeMidia } from "../entities/midia.entity";


@Injectable()
export class MidiaRepository extends BaseRepository<Midia> {
    constructor(@InjectModel(Midia) private readonly midiaModel: typeof Midia) {
        super(midiaModel);
    }

    async criar(data: InferCreationAttributes<Midia>): Promise<Midia> {
        return await this.create(data);
    }

    async buscarTodos(): Promise<Midia[]> {
        return this.findAll();
    }

    async buscarPorTipo(tipo: TypeMidia): Promise<Midia[]> {
        return await this.midiaModel.findAll({ where: { typeMidia: tipo } });
    }

    async findById(midiaId: string): Promise<Partial<Midia> | null> {
        const Midia = await this.midiaModel.findByPk(midiaId);
        if (!Midia) return null;
        return Midia.get({ plain: true }) as Partial<Midia>;
    }

    async getInstanceOfMidiaById(id: string): Promise<Midia | null> {
        return await this.midiaModel.findByPk(id);
    }

}