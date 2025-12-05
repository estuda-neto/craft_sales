import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Product } from "../entities/product.entity";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";
import { Op } from "sequelize";


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

    async findById(productId: string): Promise<Product | null> {
        const product = await this.productModel.findByPk(productId);
        if (!product) return null;
        return product?.get({ plain: true }) as Product ?? null;
    }

    async getInstanceById(id: string): Promise<Product | null> {
        return await this.productModel.findByPk(id);
    }

    async findOnSale(): Promise<Product[]> {
        return this.productModel.findAll({ where: { onSale: true } });
    }

    async findAllOfUserById(userId: string): Promise<Product[]> {
        return await this.productModel.findAll({ where: { userId }, raw: true });
    }

    async findAllChecked(): Promise<Product[]> {
        return await this.productModel.findAll({ where: { isValidated: true }, raw: true });
    }

    async filter(filters: { category?: string; min?: number; max?: number; onSale?: boolean; }): Promise<Product[]> {
        const where: any = {};

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.min || filters.max) {
            where.price = {};
            if (filters.min) where.price[Op.gte] = Number(filters.min);
            if (filters.max) where.price[Op.lte] = Number(filters.max);
        }

        if (filters.onSale) {
            where.onSale = filters.onSale === true;
        }

        return await this.productModel.findAll({ where, raw: true });
    }


}