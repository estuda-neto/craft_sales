import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

export enum TypeMidia {
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
};

@Table({ tableName: "tb_midias", timestamps: true })
export class Midia extends Model<InferAttributes<Midia>, InferCreationAttributes<Midia>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare midiaId: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare link: string;

    @Column(DataType.ENUM(...Object.values(TypeMidia)))
    declare typeMidia: CreationOptional<TypeMidia>;

    @Column(DataType.STRING)
    declare route: string;
}
