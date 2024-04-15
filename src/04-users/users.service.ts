import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserCreateDto } from './dto/user.create.dto';
import { BanUserDto } from './dto/ban.user.dto';
import { createAddressByUserDto } from '../05-user-address/dto/addressByUser.create.dto';
import { PaginationDto } from 'src/pagination';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async createUser(userDto: UserCreateDto) {
    const newUser = await this.userRepository.create(userDto);

    if (!newUser) {
      throw new HttpException(
        { message: 'User creation failed' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return newUser;
  }

  async getUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { page, limit } = paginationDto;

    // Проверка корректности типов и значений
    if (
      typeof page !== 'number' ||
      typeof limit !== 'number' ||
      page <= 0 ||
      limit <= 0
    ) {
      throw new Error('Invalid pagination parameters');
    }
    const offset = (page - 1) * limit;

    const users = await this.userRepository.findAll({
      include: { all: true },
      offset,
      limit,
    });
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

  async createAddressByUser(address: createAddressByUserDto) {
    const newAddressByUser = await this.userRepository.create(address);
    if (!newAddressByUser) {
      throw new HttpException(
        { message: `something went wrong, please try again` },
        HttpStatus.BAD_REQUEST,
      );
    }
    return newAddressByUser;
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
