import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Order } from "src/modules/order/entities/order.entity";
import { User } from "src/modules/user/entities/user.entity";

export enum BrazilStates {
    AC = "AC",
    AL = "AL",
    AP = "AP",
    AM = "AM",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MT = "MT",
    MS = "MS",
    MG = "MG",
    PA = "PA",
    PB = "PB",
    PR = "PR",
    PE = "PE",
    PI = "PI",
    RJ = "RJ",
    RN = "RN",
    RS = "RS",
    RO = "RO",
    RR = "RR",
    SC = "SC",
    SP = "SP",
    SE = "SE",
    TO = "TO",
}

@Table({ tableName: "tb_addresses", timestamps: true })
export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare addressId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare country: string;

    @Column(DataType.STRING)
    declare CEP: string;

    @Column({ type: DataType.ENUM(...Object.values(BrazilStates)), allowNull: false })
    declare state: BrazilStates;

    @Column(DataType.STRING)
    declare city: string;

    @Column(DataType.STRING)
    declare neighborhood: string;

    @Column(DataType.STRING)
    declare streetAndHouseNumber: string;

    //relationships

    /** retationship 1:N -> User*/
    @HasMany(() => User)
    declare users?: User[];

    /** retationship 1:N -> Order*/
    @HasMany(() => Order)
    declare orders?: Order[];
}

