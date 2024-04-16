import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthorCreateDto {
  @ApiProperty({ example: 'Oleg', description: `author's first name` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30, {
    message: `author's first name must be min 1 and max 30 characters`,
  })
  firstName: string;

  @ApiProperty({ example: 'Ananasenko', description: `author's last name` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 40, {
    message: `author's last name must be min 1 and max 40 characters`,
  })
  lastName: string;

  @ApiProperty({
    example: `short author's biography`,
    description: `author's short biography`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200, {
    message: `author's short biography be min 1 and max 200 characters`,
  })
  biography: string;
}
