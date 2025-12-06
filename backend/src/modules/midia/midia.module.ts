import { Module } from '@nestjs/common';
import { MidiaService } from './midia.service';
import { MidiaController } from './midia.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Midia } from './entities/midia.entity';
import { MidiaRepository } from './repository/midia.repository';

@Module({
  imports: [SequelizeModule.forFeature([Midia])],
  controllers: [MidiaController],
  providers: [MidiaService, MidiaRepository],
})
export class MidiaModule { }
