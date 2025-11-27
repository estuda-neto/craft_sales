import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Car } from "src/modules/car/entities/car.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Product } from "src/modules/product/entities/product.entity";

export enum TypeOrigin { CAR = 'CAR', PEDIDO = 'PEDIDO' };

@Table({ tableName: "tb_items", timestamps: true })
export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare itemId: CreationOptional<string>;

    @Column(DataType.STRING) //variação tamanho
    declare sizeVariation: string;

    @Column(DataType.ENUM(...Object.values(TypeOrigin)))
    declare typeOrigin: TypeOrigin;

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

    /** relationship N:1 Product */
    @ForeignKey(() => Product)
    @Column(DataType.UUID)
    declare productId: string;

    @BelongsTo(() => Product)
    declare product?: Product;
}
