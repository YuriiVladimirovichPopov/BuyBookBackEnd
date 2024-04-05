import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';
import { UserAddressDto } from './user.adress.dto';
import { Type } from 'class-transformer';

export class UserCreateDto {
  @ApiProperty({ example: 'Vasilii', description: `user's login` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 15, {
    message: `the user's login must be min 1 and max 15 characters`,
  })
  login: string;

  @ApiProperty({ type: UserAddressDto })
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto;

  @ApiProperty({ example: '89998887766', description: `user's phone's number` })
  @IsNotEmpty()
  phoneNumber: string;
}
