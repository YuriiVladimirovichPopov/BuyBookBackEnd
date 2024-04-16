import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './model/user.model';
import { BanUserDto } from './dto/ban.user.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { PaginationDto } from 'src/pagination';

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
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    return await this.userService.getUsers(paginationDto);
  }

  @ApiOperation({ summary: 'Get user by Id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get(':id')
  getById(@Param() id: number) {
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
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
