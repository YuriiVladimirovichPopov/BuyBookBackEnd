import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber, IsDate } from 'class-validator';

export class BookViewDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  bookId: number;

  @ApiProperty({ example: 'War and Peace', description: `book's title` })
  @IsString()
  @Length(2, 100, {
    message: `title must be min 2 and max 100 characters`,
  })
  title: string;

  @ApiProperty({ example: 'bla bla bla', description: `book's description` })
  @IsString()
  @Length(3, 200, {
    message: `description must be min 3 and max 200 characters`,
  })
  description: string;

  @ApiProperty({ example: '01.01.2024', description: `book's publishedDate` })
  @IsDate()
  publishedDate: Date;

  @ApiProperty({
    example: 'ISBN 978-5-93673-265-2',
    description: `book's ISBN`,
  })
  @IsString()
  ISBN: string;

  @ApiProperty({ example: '333 bucks', description: `book's price` })
  @IsString()
  @Length(2, 20, {
    message: `price must be min 3 and max 200 characters`,
  })
  price: string;
}
