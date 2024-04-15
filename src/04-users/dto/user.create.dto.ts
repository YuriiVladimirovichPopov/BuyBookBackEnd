import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { IsUniqueLogin } from 'src/validations/valid.userLogin';

export class UserCreateDto {
  @ApiProperty({ example: 'Vasilii', description: `user's login` })
  @IsString()
  @IsNotEmpty()
  @IsUniqueLogin({ message: 'user with this login already exists' })
  @Length(1, 15, {
    message: `the user's login must be min 1 and max 15 characters`,
  })
  login: string;

  @ApiProperty({
    example: '+79998887766',
    description: `user's phone's number`,
  })
  @IsPhoneNumber('RU', { message: 'Invalid phone number' })
  @IsNotEmpty()
  @Length(11, 14, {
    message: `the user's phone number must be min 11 and max 12 characters`,
  })
  phoneNumber: number;
}
