import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";

@Table({ tableName: "tb_cars", timestamps: true })
export class Car extends Model<InferAttributes<Car>, InferCreationAttributes<Car>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare carsId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: CreationOptional<string>;


    //relationships
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: CreationOptional<string>;

    @BelongsTo(() => User)
    declare user?: User;
}

