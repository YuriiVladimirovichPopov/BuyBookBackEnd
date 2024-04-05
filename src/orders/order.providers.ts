import { Order } from './order.model';

export const ordersProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useValue: Order,
  },
];
