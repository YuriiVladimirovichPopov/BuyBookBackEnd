import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './user.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
