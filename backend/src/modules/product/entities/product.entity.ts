import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Assessment } from "src/modules/assessment/entities/assessment.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { ProductCategory } from "src/modules/category/entities/productcategory.entity";
import { Item } from "src/modules/item/entities/item.entity";
import { User } from "src/modules/user/entities/user.entity";

@Table({ tableName: "tb_products", timestamps: true })
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare productId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.FLOAT)
    declare price: number;

    @Column(DataType.INTEGER)
    declare quantStock: number;

    @Column(DataType.BOOLEAN)
    declare onSale: CreationOptional<boolean>;

    @Column(DataType.FLOAT)
    declare discountpercentage: CreationOptional<number>;

    @Column(DataType.STRING)
    declare image: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare description: string;

    @Column(DataType.FLOAT)
    declare finalPrice: CreationOptional<number>;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare isValidated: CreationOptional<boolean>;


    //relationships

    /**relationship 1:N Item */
    @HasMany(() => Item)
    declare Items?: Item[];

    /**relationships 1:N Assessment */
    @HasMany(() => Assessment)
    declare assessments?: Assessment[];

    /**relationships N:N Category */
    @BelongsToMany(() => Category, () => ProductCategory)
    declare categories?: Category[];


    /** retationship N:1 -> User */
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId?: string;

    @BelongsTo(() => User)
    declare user?: User;

}
