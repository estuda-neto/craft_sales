import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Address } from "src/modules/address/entities/address.entity";
import { Item } from "src/modules/item/entities/item.entity";
import { User } from "src/modules/user/entities/user.entity";

export enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",                   // ainda nao foi pago
    DESIRING_PAYMENT = "DESIRING_PAYMENT",                 // desejando pagar
    INPHASE_PAYMENT = "INPHASE_PAYMENT",                  // em fase de pagamento
    PAID = "PAID",                                         // pago

    PROCESSING = "PROCESSING",                             // parcelado
    DESIRING_REIMBURSEMENT = "DESIRING_REIMBURSEMENT",     // desejando reembolso
    PENDING_REIMBURSEMENT = "PENDING_REIMBURSEMENT",       // desejando reembolsado
    REIMBURSEMENT = "REIMBURSEMENT",                       // reembolsado
    CANCELED = "CANCELED"                                  // cancelado
}

export enum PaymentMethod {
    PIX = "PIX",
    CREDIT_CARD = "CREDIT_CARD",
    BOLETO = "BOLETO",
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
    declare methodPayment: CreationOptional<PaymentMethod>;

    @Column(DataType.FLOAT)
    declare value: CreationOptional<number>;

    @Column(DataType.INTEGER)
    declare numberOfInstallments: CreationOptional<number>;

    @Column({ type: DataType.ARRAY(DataType.BOOLEAN), allowNull: false, defaultValue: new Array(12).fill(false) })
    declare paymentsMonths: CreationOptional<boolean[]>;

    @Column(DataType.TEXT)
    declare qrCode: CreationOptional<string>;

     @Column(DataType.TEXT)
    declare imageQrCode: CreationOptional<string>;

    @Column(DataType.STRING)
    declare code: string;

    @Column(DataType.DATE)
    declare datePayment: CreationOptional<Date>;


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
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: User;

}
