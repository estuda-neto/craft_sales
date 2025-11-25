import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Address } from "src/modules/address/entities/address.entity";
import { Item } from "src/modules/item/entities/item.entity";
import { User } from "src/modules/user/entities/user.entity";

export enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",   // aguardando pagamento
    PAID = "PAID",                         // pago
    PROCESSING = "PROCESSING",             // preparando pedido
    SENT = "SENT",                         // enviado
    DELIVERED = "DELIVERED",               // entregue
    CANCELED = "CANCELED"                  // cancelado
}

export enum PaymentMethod {
    PIX = "PIX",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    BOLETO = "BOLETO",
    CASH = "CASH"
}

@Table({ tableName: "tb_orders", timestamps: true })
export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare orderId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column({ type: DataType.ENUM(...Object.values(OrderStatus)), allowNull: false, defaultValue: OrderStatus.PENDING_PAYMENT })
    declare status: CreationOptional<OrderStatus>;

    @Column({ type: DataType.ENUM(...Object.values(PaymentMethod)), allowNull: false })
    declare methodPayment: PaymentMethod;

    @Column(DataType.FLOAT)
    declare value: number;

    @Column(DataType.STRING)
    declare code: string;

    @Column(DataType.DATE)
    declare datePayment: Date;

    @Column(DataType.DATE)
    declare dateSent: Date;

    //relationships

    /** relationships N:1 Address*/
    @ForeignKey(() => Address)
    @Column(DataType.UUID)
    declare addressId: string;

    @BelongsTo(() => Address)
    declare address?: Address;

    /** relationship 1:N Item */
    @HasMany(() => Item)
    declare items?: Item[];

    /** retationship N:1 -> User*/
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare usersId: string;

    @BelongsTo(() => User)
    declare user?: User;

}
