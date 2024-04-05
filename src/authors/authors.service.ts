import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Author } from './author.model';
import { AuthorCreateDto } from './dto/author.create.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject('AUTHOR_REPOSITORY') private authorRepository: typeof Author,
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

  async getAuthorById(id: string) {
    const author = await this.authorRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!author) {
      throw new HttpException(`Author ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return author;
  }
}
