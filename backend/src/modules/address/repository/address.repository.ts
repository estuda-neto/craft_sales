import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Address } from "../entities/address.entity";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";

@Injectable()
export class AddressRepository extends BaseRepository<Address> {

  constructor(@InjectModel(Address) private readonly addressModel: typeof Address) {
    super(addressModel);
  }

  async criar(data: InferCreationAttributes<Address>): Promise<Address> {
    return await this.create(data);
  }

  async buscarTodos(): Promise<Address[]> {
    return await this.findAll();
  }

  async findById(id: string): Promise<Partial<Address> | null> {
    const result = await this.addressModel.findByPk(id);
    return result?.get({ plain: true }) ?? null;
  }

  async getInstanceById(id: string): Promise<Address | null> {
    return await this.addressModel.findByPk(id);
  }
}
