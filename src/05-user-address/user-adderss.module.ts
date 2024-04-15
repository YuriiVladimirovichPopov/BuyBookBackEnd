import { Module } from '@nestjs/common';
import { UserAddressController } from './user-adderss.controller';
import { UserAddressService } from './user-adderss.service';
import { userAddressProviders } from './user.address.providers';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService, ...userAddressProviders],
  exports: [UserAddressService],
})
export class UserAdderssModule {}
