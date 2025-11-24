import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Car } from "src/modules/car/entities/car.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Product } from "src/modules/product/entities/product.entity";

@Table({ tableName: "tb_items", timestamps: true })
export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare itemId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING) //variação tamanho
    declare sizeVariation: string;

    @Column(DataType.STRING) //tipo de origem
    declare typeOrigin: string;

    @Column(DataType.INTEGER)
    declare quantProduct: number;

    @Column(DataType.FLOAT)
    declare price: number;

    @Column(DataType.FLOAT)
    declare subtotal: number;

    //relationships

    /** relationship N:1 Car */
    @ForeignKey(() => Car)
    @Column(DataType.UUID)
    declare carId: CreationOptional<string>;

    @BelongsTo(() => Car)
    declare car?: Car;

    /** relationship N:1 Order */
    @ForeignKey(() => Order)
    @Column(DataType.UUID)
    declare orderId: string;

    @BelongsTo(() => Order)
    declare Order?: Order;

    /**relationship 1:1 Product */
    @HasOne(() => Product)
    declare product?: Product;
}
