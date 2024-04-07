import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { UserAddressDto } from 'src/04-users/dto/user.adress.dto';
import { OrderStatus } from '../order.model';
import { Type } from 'class-transformer';

export class OrderCreateDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: '1', description: `unique identifier` })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100, {
    message: `book's title must be min 2 and max 100 characters`,
  })
  bookTitle: string;

  @ApiProperty({ type: UserAddressDto })
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto;

  @ApiProperty({ example: '20-10-2024', description: `delivery date` })
  @IsDate()
  @IsNotEmpty()
  deliveryDate: Date;

  @ApiProperty({
    example: 'in process',
    enum: OrderStatus,
    description: `Order status`,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
