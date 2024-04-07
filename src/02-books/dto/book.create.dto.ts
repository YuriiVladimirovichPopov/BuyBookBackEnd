import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, IsNumber } from 'class-validator';

export class BookCreateDto {
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

  @ApiProperty({ example: '2024-04-10', description: 'Date of publication' })
  @IsNotEmpty()
  publishedDate: Date;

  @ApiProperty({
    example: 'ISBN 978-5-93673-265-2',
    description: `book's ISBN`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 200, {
    message: `description must be min 3 and max 200 characters`,
  })
  ISBN: string;

  @ApiProperty({ example: '333 bucks', description: `book's price` })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20, {
    message: `price must be min 3 and max 200 characters`,
  })
  price: string;

  @ApiProperty({ example: 'figa figova', description: `book's author` })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
