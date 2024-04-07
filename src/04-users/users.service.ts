import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserCreateDto } from './dto/user.create.dto';
import { BanUserDto } from './dto/ban.user.dto';
import { UserAddress } from './user.address.model';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async createUser(dto: UserCreateDto) {
    const newUser = new User();
    newUser.login = dto.login;
    newUser.address = new UserAddress();
    newUser.address.country = dto.address.country;
    newUser.address.city = dto.address.city;
    newUser.address.street = dto.address.street;
    newUser.address.building = dto.address.building;
    newUser.address.apartment = dto.address.apartment;
    newUser.phoneNumber = dto.phoneNumber;

    const savedUser = await newUser.save();

    if (!savedUser) {
      throw new HttpException(
        { message: 'User unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return savedUser;
  }

  async getUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.id);
    if (!user) {
      throw new HttpException(`User ${dto.id} not found`, HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return { message: `User ${id} deleted successfully` };
  }
}
