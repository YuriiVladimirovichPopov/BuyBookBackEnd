import { Order } from './model/order.model';

export const ordersProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useValue: Order,
  },
];
