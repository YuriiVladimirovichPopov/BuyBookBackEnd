import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { BanUserDto } from './dto/ban.user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UserCreateDto } from './dto/user.create.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: UserCreateDto) {
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Get user by Id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getById(@Param() id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: `Ban users` })
  @ApiResponse({ status: 200 })
  @Post('/ban')
  banUsers(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }

  @ApiOperation({ summary: `Delete user by Id` })
  @ApiResponse({ status: 200 })
  @Delete()
  deleteUser(@Param() id: string) {
    return this.userService.deleteUserById(id);
  }
}
