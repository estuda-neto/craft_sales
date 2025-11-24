import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tb_items", timestamps: true })
export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare productId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;
}
