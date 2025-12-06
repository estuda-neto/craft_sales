import { Injectable } from '@nestjs/common';
import { CreateMidiaDto } from './dto/create-midia.dto';
import { UpdateMidiaDto } from './dto/update-midia.dto';
import { BaseService } from 'src/common/base/base.service';
import { Midia } from './entities/midia.entity';
import { InferCreationAttributes } from 'sequelize';
import { ApiError } from 'src/common/errors/apierror.class';
import { MidiaRepository } from './repository/midia.repository';

@Injectable()
export class MidiaService extends BaseService<Midia, CreateMidiaDto, UpdateMidiaDto> {
  constructor(private readonly midiaRepository: MidiaRepository) {
    super(midiaRepository);
  }

  async create(createDto: CreateMidiaDto): Promise<Midia> {
    return await this.midiaRepository.criar(createDto as InferCreationAttributes<Midia>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Midia[]; count: number }> {
    const result = await this.midiaRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }
}