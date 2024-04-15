import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAddressService } from './user-adderss.service';
import { UserAddress } from './user.address.model';
import { createAddressByUserDto } from './dto/addressByUser.create.dto';

@ApiTags('user_address')
@Controller('user-address')
export class UserAddressController {
  constructor(private userAddressService: UserAddressService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: UserAddress })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userAddressDto: createAddressByUserDto) {
    const newUser =
      await this.userAddressService.createUserAddress(userAddressDto);
    return newUser;
  }

  @ApiOperation({ summary: 'Get user address by Id' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @Get(':id')
  getById(@Param() id: number) {
    return this.userAddressService.getUserAddress(id);
  }
}