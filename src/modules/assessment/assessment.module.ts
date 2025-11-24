import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assessment } from './entities/assessment.entity';
import { AssessmentRepository } from './repository/assessment.repository';

@Module({
  imports: [SequelizeModule.forFeature([Assessment])],
  controllers: [AssessmentController],
  providers: [AssessmentService, AssessmentRepository],
})
export class AssessmentModule { }
