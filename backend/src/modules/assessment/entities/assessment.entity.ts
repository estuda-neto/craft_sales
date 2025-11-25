import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "src/modules/product/entities/product.entity";

@Table({ tableName: "tb_assessments", timestamps: true })
export class Assessment extends Model<InferAttributes<Assessment>, InferCreationAttributes<Assessment>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare assessmentId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    //relationships

    /**relationships N:1 Product */
    @ForeignKey(() => Product)
    @Column(DataType.UUID)
    declare productId: string;

    @BelongsTo(() => Product)
    declare product?: Product;
}
