import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './entities/address.entity';
import { AddressRepository } from './repository/address.repository';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
})
export class AddressModule { }
