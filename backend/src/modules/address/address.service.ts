import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiError } from 'src/common/errors/apierror.class';
import { InferCreationAttributes } from 'sequelize';
import { Address } from './entities/address.entity';
import { AddressRepository } from './repository/address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService extends BaseService<Address, CreateAddressDto, UpdateAddressDto> {
  constructor(private readonly addressRepository: AddressRepository) {
    super(addressRepository);
  }

  async create(createDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.criar(createDto as InferCreationAttributes<Address>);
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: Address[]; count: number }> {
    const result = await this.addressRepository.findWithPagination(limit, offset);
    if (!result) throw new ApiError('The resource could not be retrieved', 400);
    return result;
  }
}
