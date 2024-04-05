import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.model';
import { AuthorCreateDto } from './dto/author.create.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  @ApiOperation({ summary: 'Create Author' })
  @ApiResponse({ status: 201, type: Author })
  @UsePipes(ValidationPipe)
  @Post()
  async createAuthor(@Body() authorDto: AuthorCreateDto) {
    const newUser = await this.authorService.createAuthor(authorDto);
    return newUser;
  }

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, type: [Author] })
  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @ApiOperation({ summary: 'Get author by Id' })
  @ApiResponse({ status: 200, type: [Author] })
  @Get()
  getAuthorById(@Param() id: string) {
    return this.authorService.getAuthorById(id);
  }
}
