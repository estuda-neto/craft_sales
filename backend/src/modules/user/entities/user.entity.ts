import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AfterCreate, BeforeCreate, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Car } from "src/modules/car/entities/car.entity";
import { Address } from "src/modules/address/entities/address.entity";
import { Order } from "src/modules/order/entities/order.entity";
import * as bcrypt from 'bcrypt';
import { Product } from "src/modules/product/entities/product.entity";

export enum TypeUser {
    CLIENTE = 'CLIENTE',
    ADMIN = 'ADMIN',
    ARTESAO = 'ARTESAO',
}
export enum TypeArtisan {
    CERÂMICA = 'CERÂMICA',
    MADEIRA = 'ADMIN',
    TECIDOS = 'ARTESAO',
    FIBRA = 'ARTESAO',
    METAL = 'METAL',
    RECICLÁVEIS = 'RECICLÁVEIS',
    PINTURA = 'PINTURA',
    ESCULTURA = 'ESCULTURA',
    PEDRA_SABÃO = 'PEDRA_SABÃO',
}
export function fromString(value: string): TypeUser {
    switch (value) {
        case 'CLIENTE':
            return TypeUser.CLIENTE;
        case 'ADMIN':
            return TypeUser.ADMIN;
        case 'ARTESAO':
            return TypeUser.ARTESAO;
        default:
            throw new Error('type user invalid.');
    }
}
export enum TypeUserStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    BANNED = 'BANNED',
}

@Table({ tableName: "tb_users", timestamps: true })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare userId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column({ type: DataType.STRING, unique: true })
    declare email: string;

    @Column({ type: DataType.STRING, unique: true })
    declare cpf: string;

    @Column({ type: DataType.DATEONLY })
    declare dateOfBirth: Date;

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.STRING)
    declare phone: string;

    @Column(DataType.STRING)
    declare photo: CreationOptional<string>;

    @Column(DataType.STRING)
    declare bio: CreationOptional<string>;

    @Column(DataType.FLOAT)
    declare score: CreationOptional<number>;

    @Column(DataType.ENUM(...Object.values(TypeUser)))
    declare typeuser: TypeUser;

    @Column(DataType.ENUM(...Object.values(TypeUserStatus)))
    declare userStatus: CreationOptional<TypeUserStatus>;

    @Column(DataType.BOOLEAN)
    declare checked: CreationOptional<boolean>;

    @Column(DataType.STRING)
    declare craftsmanRegistration: CreationOptional<string>;

    @Column(DataType.STRING)
    declare numberWalletCICAB: CreationOptional<string>;

    @Column(DataType.ENUM(...Object.values(TypeArtisan)))
    declare artisanType: CreationOptional<TypeArtisan>;

    //relationships - no use CreationOptional, sequelize ja trata como atributo de relacionamento. opcional

    /** retationship 1:1 -> Car*/
    @HasOne(() => Car)
    declare car?: Car;

    /** retationship N:1 -> Address*/
    @ForeignKey(() => Address)
    @Column(DataType.UUID)
    declare addressId?: string;

    @BelongsTo(() => Address)
    declare address?: Address;

    /** retationship 1:N -> Order*/
    @HasMany(() => Order)
    declare orders?: Order[];

    /** retationship 1:N -> Product*/
    @HasMany(() => Product)
    declare products?: Product[];

    //Listeners
    @BeforeCreate
    static async hashPassword(instance: User) {
        const salt = await bcrypt.genSalt(12);
        instance.userStatus = TypeUserStatus.ACTIVE;
        instance.typeuser = TypeUser.CLIENTE;
        instance.password = await bcrypt.hash(instance.password, salt);
    }

    @AfterCreate
    static async createCar(instance: User) {
        await Car.create({ userId: instance.userId, name: `${instance.name} user's shopping cart` });
    }
}
