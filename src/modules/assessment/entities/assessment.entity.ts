import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tb_assessments", timestamps: true })
export class Assessment extends Model<InferAttributes<Assessment>, InferCreationAttributes<Assessment>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare assessmentId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;
}
