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
    const newBook = await this.bookService.createBook(bookDto);
    return newBook;
  }
  //TODO: добавить пагинацию
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @ApiOperation({ summary: 'Get book by Id' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return await this.bookService.getBookById(id);
  }

  @ApiOperation({ summary: `Delete book by Id` })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.bookService.deleteBookById(id);
    return { message: `Book ${id} deleted successfully` };
  }
}
