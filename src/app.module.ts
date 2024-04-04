import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, BooksModule, AuthorsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
