import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './entities/item.entity';
import { ItemRepository } from './repository/item.repository';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService],
})
export class ItemModule { }
