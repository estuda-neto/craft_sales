import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  async create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return await this.assessmentService.create(createAssessmentDto);
  }

  @Get()
  async findAll() {
    return await this.assessmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.assessmentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssessmentDto: UpdateAssessmentDto) {
    return await this.assessmentService.update(id, updateAssessmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.assessmentService.remove(id);
  }
}
