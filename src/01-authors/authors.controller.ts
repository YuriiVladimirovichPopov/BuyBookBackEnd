import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.model';
import { AuthorCreateDto } from './dto/author.create.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/pagination';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  @ApiOperation({ summary: 'Create Author' })
  @ApiResponse({ status: 201, type: Author })
  @UsePipes(ValidationPipe)
  @Post()
  async createAuthor(@Body() authorDto: AuthorCreateDto) {
    const newAuthor = await this.authorService.createAuthor(authorDto);
    return newAuthor;
  }

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, type: [Author] })
  @Get()
  async getAllAuthors(@Query() paginationDto: PaginationDto) {
    return await this.authorService.getAllAuthors(paginationDto);
  }

  @ApiOperation({ summary: 'Get author by Id' })
  @ApiResponse({ status: 200, type: [Author] })
  @Get(':id')
  async getAuthorById(@Param('id') id: number): Promise<Author> {
    return await this.authorService.getAuthorById(id);
  }

  @ApiOperation({ summary: `Delete Author by Id` })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async deleteAuthorById(@Param('id') id: number) {
    return await this.authorService.deleteAuthorById(id);
  }
}
