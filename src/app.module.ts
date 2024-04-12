import { Module } from '@nestjs/common';
import { UsersModule } from './04-users/users.module';
import { BooksModule } from './02-books/books.module';
import { AuthorsModule } from './01-authors/authors.module';
import { OrdersModule } from './03-orders/orders.module';
import { DataBaseModule } from './data-base/data-base.module';
import { UsersController } from './04-users/users.controller';
import { BooksController } from './02-books/books.controller';
import { AuthorsController } from './01-authors/authors.controller';
import { OrdersController } from './03-orders/orders.controller';
import { UsersService } from './04-users/users.service';
import { BooksService } from './02-books/books.service';
import { OrdersService } from './03-orders/orders.service';
import { AuthorsService } from './01-authors/authors.service';
import { usersProviders } from './04-users/user.providers';
import { booksProviders } from './02-books/book.providers';
import { authorsProviders } from './01-authors/author.providers';
import { ordersProviders } from './03-orders/order.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    AuthorsModule,
    OrdersModule,
    DataBaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [
    UsersController,
    BooksController,
    AuthorsController,
    OrdersController,
  ],
  providers: [
    UsersService,
    BooksService,
    AuthorsService,
    OrdersService,
    //providers
    ...usersProviders,
    ...booksProviders,
    ...authorsProviders,
    ...ordersProviders,
  ],
})
export class AppModule {}
