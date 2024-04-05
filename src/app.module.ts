import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { OrdersModule } from './orders/orders.module';
import { DataBaseModule } from './data-base/data-base.module';
import { UsersController } from './users/users.controller';
import { BooksController } from './books/books.controller';
import { AuthorsController } from './authors/authors.controller';
import { OrdersController } from './orders/orders.controller';
import { UsersService } from './users/users.service';
import { BooksService } from './books/books.service';
import { OrdersService } from './orders/orders.service';
import { AuthorsService } from './authors/authors.service';
import { usersProviders } from './users/user.providers';
import { booksProviders } from './books/book.providers';
import { authorsProviders } from './authors/author.providers';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    AuthorsModule,
    OrdersModule,
    DataBaseModule,
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
  ],
})
export class AppModule {}
