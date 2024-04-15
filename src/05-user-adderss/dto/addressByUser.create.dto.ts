import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

export class createAddressByUserDto {
  @ApiProperty({ example: 'Nevidaliya', description: `country` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 40, {
    message: `the user's country must be min 1 and max 40 characters`,
  })
  country: string;

  @ApiProperty({ example: 'BiggaGrad', description: `user's sity` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 87, {
    message: `the user's sity must be min 1 and max 87 characters`,
  })
  sity: string;

  @ApiProperty({ example: 'Progerov', description: `user's street` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 86, {
    message: `the user's street must be min 1 and max 86 characters`,
  })
  street: string;

  @ApiProperty({ example: 'Vasilii', description: `user's building` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10, {
    message: `the user's building must be min 1 and max 10 characters`,
  })
  building: string;

  @ApiProperty({ example: '777', description: `user's apartment` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10, {
    message: `the user's apartment must be min 1 and max 10 characters`,
  })
  apartment: string;

  @ApiProperty({ example: '3', description: `user's Id` })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
