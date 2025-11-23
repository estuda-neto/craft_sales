import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

export enum TypeUser {
    LEITOR = 'LEITOR',
    ADMIN = 'ADMIN',
    COLUNISTA = 'COLUNISTA',
}
export function fromString(value: string): TypeUser {
    switch (value) {
        case 'LEITOR':
            return TypeUser.LEITOR;
        case 'ADMIN':
            return TypeUser.ADMIN;
        case 'COLUNISTA':
            return TypeUser.COLUNISTA;
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

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.STRING)
    declare phone: string;

    @Column(DataType.STRING)
    declare photo: CreationOptional<string>;

    @Column(DataType.STRING)
    declare bio: CreationOptional<string>;

    @Column(DataType.STRING)
    declare country: string;

    @Column(DataType.STRING)
    declare state: string;

    @Column(DataType.STRING)
    declare city: string;

    @Column(DataType.STRING)
    declare address: string;

    @Column(DataType.FLOAT)
    declare score: CreationOptional<number>;

    @Column(DataType.ENUM(...Object.values(TypeUser)))
    declare typeuser: TypeUser;

    @Column(DataType.ENUM(...Object.values(TypeUserStatus)))
    declare userStatus: CreationOptional<TypeUserStatus>;

    @Column(DataType.BOOLEAN)
    declare checked: CreationOptional<boolean>;
}
