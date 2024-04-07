import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'Vasilii', description: `user's login` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 15, {
    message: `the user's login must be min 1 and max 15 characters`,
  })
  login: string;

  @ApiProperty({ example: '89998887766', description: `user's phone's number` })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'user address', description: `user's address` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150, {
    message: `the user's address must be min 1 and max 15 characters`,
  })
  address: string;
}
