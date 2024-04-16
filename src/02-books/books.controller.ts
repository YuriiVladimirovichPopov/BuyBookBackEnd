import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Book } from './model/book.model';
import { BookCreateDto } from './dto/book.create.dto';
import { PaginationDto } from 'src/pagination';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Create Book' })
  @ApiResponse({ status: 201, type: Book })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() bookDto: BookCreateDto) {
    const newBook = await this.booksService.createBook(bookDto);
    return newBook;
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  async getAllBooks(@Query() paginationDto: PaginationDto) {
    return await this.booksService.getAllBooks(paginationDto);
  }

  @ApiOperation({ summary: 'Get book by Id' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return await this.booksService.getBookById(id);
  }

  @ApiOperation({ summary: 'Get book by title' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(':title')
  async searchByTitle(@Query('title') title: string): Promise<Book> {
    return await this.booksService.searchBookByTitle(title);
  }

  @ApiOperation({ summary: 'Get book by price' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(':price')
  async searchByPrice(@Query('price') price: number): Promise<Book> {
    return await this.booksService.searchBookByPrice(price);
  }

  @ApiOperation({ summary: 'Get book by author' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(':authorId')
  async searchByAuthor(@Query('authorId') authorId: number): Promise<Book[]> {
    return await this.booksService.searchBooksByAuthor(authorId);
  }

  @ApiOperation({ summary: 'Get book by order' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(':order')
  async searchByOrder(@Query('orderId') orderId: number): Promise<Book[]> {
    return await this.booksService.searchBooksByOrder(orderId);
  }

  @ApiOperation({ summary: 'Update book by price' })
  @ApiResponse({ status: 204, type: [Book] })
  @Put(':price')
  async updatePrice(
    @Param('id') id: number,
    @Body('price') price: number,
  ): Promise<Book> {
    return await this.booksService.updateBookPrice(id, price);
  }

  @ApiOperation({ summary: `Delete book by Id` })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    try {
      await this.booksService.deleteBookById(id);
      return { message: `Book ${id} deleted successfully` };
    } catch (error) {
      throw new HttpException(
        `Book ${id} could not be deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
