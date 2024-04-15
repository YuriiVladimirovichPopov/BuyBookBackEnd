import { Module } from '@nestjs/common';
import { UserAdderssController } from './user-adderss.controller';
import { UserAdderssService } from './user-adderss.service';
import { userAddressProviders } from './user.providers';

@Module({
  controllers: [UserAdderssController],
  providers: [UserAdderssService, ...userAddressProviders],
})
export class UserAdderssModule {}
