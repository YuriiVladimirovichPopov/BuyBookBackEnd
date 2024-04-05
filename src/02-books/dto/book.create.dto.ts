import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber, IsNotEmpty } from 'class-validator';

export class BookCreateDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  bookId: number;

  @ApiProperty({ example: 'War and Peace', description: `book's title` })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100, {
    message: `title must be min 2 and max 100 characters`,
  })
  title: string;

  @ApiProperty({ example: 'bla bla bla', description: `book's description` })
  @IsString()
  @IsNotEmpty()
  @Length(3, 200, {
    message: `description must be min 3 and max 200 characters`,
  })
  description: string;

  @ApiProperty({ example: '333 bucks', description: `book's price` })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20, {
    message: `price must be min 3 and max 200 characters`,
  })
  price: string;
}
