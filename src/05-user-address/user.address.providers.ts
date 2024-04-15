import { UserAddress } from 'src/05-user-address/user.address.model';

export const userAddressProviders = [
  {
    provide: 'ADDRESSREPOSITORY',
    useValue: UserAddress,
  },
];
