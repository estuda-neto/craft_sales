import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "src/modules/product/entities/product.entity";
import { Category } from "./category.entity";

@Table({ tableName: "tb_products_categories", timestamps: true })
export class ProductCategory extends Model<InferAttributes<ProductCategory>, InferCreationAttributes<ProductCategory>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare productcategoryId: CreationOptional<string>;

    //relationships
    @ForeignKey(() => Product)
    @Column(DataType.UUID)
    declare productId: string;

    @BelongsTo(() => Product)
    declare product?: Product;


    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    declare categoryId: string;

    @BelongsTo(() => Category)
    declare category?: Category;
}
