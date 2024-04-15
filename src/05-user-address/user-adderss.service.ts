import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserAddress } from './user.address.model';
import { createAddressByUserDto } from './dto/addressByUser.create.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @Inject('ADDRESSREPOSITORY')
    private userAddressRepository: typeof UserAddress,
  ) {}

  async createUserAddress(addressDto: createAddressByUserDto) {
    const newAddress = await this.userAddressRepository.create(addressDto);

    if (!newAddress) {
      throw new HttpException(
        { message: 'User address creation failed' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newAddress;
  }

  async getUserAddress(id: number) {
    const address = await this.userAddressRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!address) {
      throw new HttpException(
        `User address with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return address;
  }
}
