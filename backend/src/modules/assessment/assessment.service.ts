import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { AssessmentRepository } from './repository/assessment.repository';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Assessment } from './entities/assessment.entity';

@Injectable()
export class AssessmentService extends BaseService<Assessment, CreateAssessmentDto, UpdateAssessmentDto> {
  constructor(private readonly assessmentRepository: AssessmentRepository) {
    super(assessmentRepository);
  }

  async create(createDto: CreateAssessmentDto): Promise<Assessment> {
    return await this.assessmentRepository.criar(createDto as InferCreationAttributes<Assessment>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Assessment[]; count: number }> {
    const result = await this.assessmentRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }
}
