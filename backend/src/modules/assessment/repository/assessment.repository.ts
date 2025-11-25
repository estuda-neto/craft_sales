import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Assessment } from "../entities/assessment.entity";
import { InjectModel } from "@nestjs/sequelize";
import { InferCreationAttributes } from "sequelize";

@Injectable()
export class AssessmentRepository extends BaseRepository<Assessment> {

  constructor(@InjectModel(Assessment) private readonly assessmentModel: typeof Assessment) {
    super(assessmentModel);
  }

  async criar(data: InferCreationAttributes<Assessment>): Promise<Assessment> {
    return await this.create(data);
  }

  async buscarTodos(): Promise<Assessment[]> {
    return await this.findAll();
  }

  async findById(id: string): Promise<Partial<Assessment> | null> {
    const result = await this.assessmentModel.findByPk(id);
    return result?.get({ plain: true }) ?? null;
  }

  async getInstanceById(id: string): Promise<Assessment | null> {
    return await this.assessmentModel.findByPk(id);
  }
}
