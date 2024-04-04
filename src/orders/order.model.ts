import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Book } from 'src/books/book.model';
import { User } from 'src/users/user.model';

interface Adress {
  country: string;
  city: string;
  street: string;
  building: number;
  apartament?: number;
}

export enum OrderStatus {
  InProcess = 'in process',
  Delivered = 'delivered',
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, Adress> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  orderId: number;

  @ApiProperty({ example: 'book', description: `book's title` })
  @Column({
    type: DataType.NUMBER,
    unique: true,
    allowNull: false,
    field: 'book_id',
  })
  bookId: number;

  // eslint-disable-next-line prettier/prettier
  @ApiProperty({ example: `Russian Federation, Lenin's street, building 20, apart. 100`, description: `user's adress` })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  deliveryAdress: Adress;

  @ApiProperty({ example: `10-01-2024`, description: `delivery date` })
  @Column({
    type: DataType.DATE,
    unique: true,
    defaultValue: false,
  })
  deliveryDate: Date;

  @ApiProperty({ example: `in process`, description: `order status` })
  @Column({
    type: DataType.ENUM(OrderStatus.InProcess, OrderStatus.Delivered),
    defaultValue: OrderStatus.InProcess,
  })
  status: OrderStatus;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  book_id: number;

  @BelongsTo(() => User)
  userId: User;
}
