import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { BookCreateDto } from './dto/book.create.dto';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOK_REPOSITORY') private bookRepository: typeof Book) {}

  async createBook(dto: BookCreateDto) {
    dto.publishedDate = new Date(dto.publishedDate);
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
      include: { all: true, nested: true },
    });
    if (!book) {
      throw new HttpException(`Book ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async searchBookByTitle(title: string): Promise<Book> {
    const titleByBook = await this.bookRepository.findOne({
      where: { title },
      include: { all: true, nested: true },
    });
    if (!titleByBook) {
      throw new HttpException(`Book ${title} not found`, HttpStatus.NOT_FOUND);
    }
    return titleByBook;
  }

  async searchBookByPrice(price: number) {
    const priceBook = await this.bookRepository.findOne({
      where: { price },
      include: { all: true, nested: true },
    });
    if (!priceBook) {
      throw new HttpException(
        `Book with ${price} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return priceBook;
  }

  async updateBookPrice(id: number, price: number) {
    const book = await this.bookRepository.findByPk(id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }

    book.price = price;
    await book.save();

    return book;
  }

  async deleteBookById(id: number): Promise<boolean> {
    const book = await this.bookRepository.findByPk(id);
    if (!book) {
      throw new HttpException(`Book ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await book.destroy();
    const deletedBook = await this.bookRepository.findByPk(id);
    if (!deletedBook) {
      throw new HttpException(
        `Book ${id} could not be deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }
}
