import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { BookCreateDto } from './dto/book.create.dto';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOK_REPOSITORY') private bookRepository: typeof Book) {}

  async createBook(dto: BookCreateDto) {
    const newBook = await this.bookRepository.create(dto);
    if (!newBook) {
      throw new HttpException(
        { message: 'book not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return newBook;
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAll({ include: { all: true } });
    return books;
  }

  async getBookById(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!book) {
      throw new HttpException(`Book ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async deleteBookById(id: number) {
    const book = await this.bookRepository.findByPk(id);
    if (!book) {
      throw new HttpException(`Book ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await book.destroy();
    return { message: `Book ${id} deleted successfully` };
  }
}
