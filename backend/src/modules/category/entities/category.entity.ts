import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "src/modules/product/entities/product.entity";
import { ProductCategory } from "./productcategory.entity";

@Table({ tableName: "tb_categories", timestamps: true })
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare categoryId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare slug: string;

    @Column(DataType.TEXT)
    declare description: string;


    //relationships

    /**relationships N:N Product */
    @BelongsToMany(() => Product, () => ProductCategory)
    declare products?: Product[];
}
