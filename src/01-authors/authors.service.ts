import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Author } from './author.model';
import { AuthorCreateDto } from './dto/author.create.dto';
import { BooksService } from 'src/02-books/books.service';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject('AUTHOR_REPOSITORY') private authorRepository: typeof Author,
    private bookService: BooksService,
  ) {}

  async createAuthor(dto: AuthorCreateDto) {
    const newAuthor = await this.authorRepository.create(dto);
    if (!newAuthor) {
      throw new HttpException(
        { message: 'book not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return newAuthor;
  }

  async getAllAuthors() {
    const authors = await this.authorRepository.findAll({
      include: { all: true },
    });
    return authors;
  }

  async getAuthorById(id: number) {
    const author = await this.authorRepository.findOne({
      where: { id },
      include: { all: true, nested: true },
    });
    if (!author) {
      throw new HttpException(`Author ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return author;
  }
}
