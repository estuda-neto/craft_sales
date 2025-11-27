import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsToMany, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Assessment } from "src/modules/assessment/entities/assessment.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { ProductCategory } from "src/modules/category/entities/productcategory.entity";
import { Item } from "src/modules/item/entities/item.entity";

@Table({ tableName: "tb_products", timestamps: true })
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare productId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    //relationships

    /**relationship 1:N Item */
    @HasMany(() => Item)
    declare Items?: Item[];

    /**relationships 1:N Assessment */
    @HasMany(() => Assessment)
    declare assessments?: Assessment[];

    /**relationships N:N Category */
    @BelongsToMany(()=>Category,()=>ProductCategory)
    declare categories?:Category[];
}
