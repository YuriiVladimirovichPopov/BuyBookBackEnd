import { UserAddress } from 'src/05-user-address/model/user.address.model';

export const userAddressProviders = [
  {
    provide: 'ADDRESSREPOSITORY',
    useValue: UserAddress,
  },
];
