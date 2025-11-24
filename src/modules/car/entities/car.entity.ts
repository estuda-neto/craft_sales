import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tb_cars", timestamps: true })
export class Car extends Model<InferAttributes<Car>, InferCreationAttributes<Car>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare carsId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;
}

