import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { authorsProviders } from './author.providers';
import { BooksModule } from 'src/02-books/books.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, ...authorsProviders],
  imports: [AuthorsModule, BooksModule],
})
export class AuthorsModule {}
