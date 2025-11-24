import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tb_addresses", timestamps: true })
export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare addressId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;
}

