import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Product } from "../entities/product.entity";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";


@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(@InjectModel(Product) private readonly productModel: typeof Product) {
        super(productModel);
    }

    async criar(product: InferCreationAttributes<Product>): Promise<Product> {
        return await this.create(product);
    }

    async buscarTodos(): Promise<Product[]> {
        return await this.findAll();
    }

    async findById(productId: string): Promise<Partial<Product> | null> {
        const product = await this.productModel.findByPk(productId);
        if (!product) return null;
        return product.get({ plain: true }) as Partial<Product>;
    }

    async getInstanceById(id: string): Promise<Product | null> {
        return await this.productModel.findByPk(id);
    }

}