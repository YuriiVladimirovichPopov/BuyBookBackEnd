import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber } from 'class-validator';

export class AuthorCreateDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  authorId: number;

  @ApiProperty({ example: 'Oleg', description: `author's first name` })
  @IsString()
  @Length(1, 30, {
    message: `author's first name must be min 1 and max 30 characters`,
  })
  firstName: string;

  @ApiProperty({ example: 'Ananasenko', description: `author's last name` })
  @IsString()
  @Length(1, 40, {
    message: `author's last name must be min 1 and max 40 characters`,
  })
  lastName: string;

  @ApiProperty({ example: 'Ananasenko', description: `author's last name` })
  @IsString()
  @Length(1, 40, {
    message: `author's bioraphy must be min 10 and max 100 characters`,
  })
  shortBioraphy: string;
}
