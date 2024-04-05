import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Book } from './book.model';
import { BookCreateDto } from './dto/book.create.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiOperation({ summary: 'Create Book' })
  @ApiResponse({ status: 201, type: Book })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() bookDto: BookCreateDto) {
    const newUser = await this.bookService.createBook(bookDto);
    return newUser;
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @ApiOperation({ summary: 'Get book by Id' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  getBookById(@Param() id: string) {
    return this.bookService.getBookById(id);
  }

  @ApiOperation({ summary: `Delete book by Id` })
  @ApiResponse({ status: 200 })
  @Delete()
  deleteUser(@Param() id: string) {
    return this.bookService.deleteBookById(id);
  }
}
