import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthorCreateDto } from './dto/author.create.dto';
import { PaginationDto } from 'src/pagination';
import { Author } from './author.model';

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

  async getAllAuthors(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    if (
      typeof page !== 'number' ||
      typeof limit !== 'number' ||
      page <= 0 ||
      limit <= 0
    ) {
      throw new Error('Invalid pagination parameters');
    }

    const offset = (page - 1) * limit;
    const authors = await this.authorRepository.findAll({
      include: { all: true },
      offset,
      limit,
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

  async deleteAuthorById(id: number) {
    const authorId = await this.authorRepository.findByPk(id);
    if (!authorId) {
      throw new HttpException(`Author ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await authorId.destroy();
    return { message: `Author with ${id} deleted successfully` };
  }
}
