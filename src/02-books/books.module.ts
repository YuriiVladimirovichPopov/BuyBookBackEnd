import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { booksProviders } from './book.providers';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ...booksProviders],
  exports: [BooksService],
})
export class BooksModule {}
