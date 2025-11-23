import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";
import { BaseRepository } from "src/common/base/base.repository";
import { TypeUser, User } from "../entities/user.entity";


@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectModel(User) private readonly usuarioModel: typeof User) {
        super(usuarioModel);
    }

    async criar(data: InferCreationAttributes<User>): Promise<User> {
        return await this.create(data);
    }

    async buscarPorEmail(email: string): Promise<User | null> {
        return this.usuarioModel.findOne({ where: { email } });
    }

    async buscarTodos(): Promise<User[]> {
        return this.findAll();
    }

    async buscarPorTipo(tipo: TypeUser): Promise<User[]> {
        return await this.usuarioModel.findAll({ where: { typeuser: tipo } });
    }

    async updatePassword(id: string, hashedPassword: string): Promise<[number, User[]]> {
        return this.updatePartial(id, { password: hashedPassword });
    }

    async findById(userId: string): Promise<Partial<User> | null> {
        const user = await this.usuarioModel.findByPk(userId);
        if (!user) return null;
        return user.get({ plain: true }) as Partial<User>;
    }

    async getInstanceOfUserById(id: string): Promise<User | null> {
        return await this.usuarioModel.findByPk(id);
    }

}