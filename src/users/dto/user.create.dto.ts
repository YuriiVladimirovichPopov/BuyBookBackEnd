import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';
import { UserAdressDto } from './user.adress.dto';
import { Type } from 'class-transformer';

export class UserCreateDto {
  @ApiProperty({ example: 'Vasilii', description: `user's login` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 15, {
    message: `the user's login must be min 1 and max 15 characters`,
  })
  login: string;

  @ApiProperty({ type: UserAdressDto })
  @ValidateNested()
  @Type(() => UserAdressDto)
  adress: UserAdressDto;

  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNotEmpty()
  phoneNumber: string;
}
