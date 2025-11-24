import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tb_products", timestamps: true })
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare productId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;
}
