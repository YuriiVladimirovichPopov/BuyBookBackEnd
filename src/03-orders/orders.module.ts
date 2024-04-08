import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ordersProviders } from './order.providers';
import { UsersModule } from 'src/04-users/users.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders],
  imports: [UsersModule],
})
export class OrdersModule {}
