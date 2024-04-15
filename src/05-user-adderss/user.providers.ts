import { UserAddress } from 'src/05-user-adderss/user.address.model';

export const userAddressProviders = [
  {
    provide: 'USERADDRESS_REPOSITORY',
    useValue: UserAddress,
  },
];
