import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { OrderStatus } from '../model/order.model';

export class OrderCreateDto {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 'BLABLABLA', description: `book's title` })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100, {
    message: `book's title must be min 2 and max 100 characters`,
  })
  bookTitle: string;

  @ApiProperty({ example: '1', description: `delivery address` })
  @IsString()
  @IsNotEmpty()
  @Length(10, 400, {
    message: `delivery address must be min 10 and max 400 characters`,
  })
  deliveryAddress: string;

  @ApiProperty({ example: '20-10-2024', description: `delivery date` })
  @IsString()
  @IsNotEmpty()
  deliveryDate: string;

  @ApiProperty({
    example: 'in process',
    enum: OrderStatus,
    description: `Order status`,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ example: '1', description: `book's identifier` })
  @IsNumber()
  bookId: number;

  @ApiProperty({ example: '1', description: `user's identifier` })
  @IsNumber()
  userId: number;
}
