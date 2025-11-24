import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Item } from "src/modules/item/entities/item.entity";
import { User } from "src/modules/user/entities/user.entity";

export enum CarStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    PENDING = "PENDING",
}

@Table({ tableName: "tb_cars", timestamps: true })
export class Car extends Model<InferAttributes<Car>, InferCreationAttributes<Car>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare carId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: CreationOptional<string>;

    @Column({ type: DataType.ENUM(...Object.values(CarStatus)), allowNull: false, defaultValue: CarStatus.OPEN })
    declare status: CreationOptional<CarStatus>;

    @Column(DataType.FLOAT)
    declare total: CreationOptional<number>;

    //relationships

    /**relationships 1:1 User */
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: CreationOptional<string>;

    @BelongsTo(() => User)
    declare user?: User;


    /** relationship 1:N Item */
    @HasMany(() => Item)
    declare items?: Item[];
}

