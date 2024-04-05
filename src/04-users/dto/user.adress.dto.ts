import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { BelongsTo } from 'sequelize-typescript';
import { User } from '../user.model';

export class UserAddressDto {
  @ApiProperty({ example: 'Nebyvaliya', description: `the country's name` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 82, {
    message: `the country's name must be min 1 and max 82 characters`,
  })
  country: string;

  @ApiProperty({ example: 'BLablaTown', description: `the city's name` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 92, {
    message: `the city's name must be min 1 and max 82 characters`,
  })
  city: string;

  @ApiProperty({ example: 'Lodirey', description: `the street's name` })
  @IsString()
  @IsNotEmpty()
  @Length(1, 85, {
    message: `the street's name must be min 1 and max 85 characters`,
  })
  street: string;

  @ApiProperty({ example: '666', description: `the building's number` })
  @IsNumber()
  @Length(1, 6, {
    message: `the building's number must be min 1 and max 82 characters`,
  })
  building: number;

  @ApiProperty({ example: '666', description: `the apartmen's number` })
  @IsNumber()
  @Length(1, 6, {
    message: `the apartmen's number must be min 1 and max 82 characters`,
  })
  apartment?: number;

  @BelongsTo(() => User)
  user: User;
}
