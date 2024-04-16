import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Book } from 'src/02-books/model/book.model';
import { User } from 'src/04-users/model/user.model';
import { OrderBooks } from './order.books.model';

export enum OrderStatus {
  InProcess = 'in process',
  Delivered = 'delivered',
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Pyskin', description: `book's title` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'book title',
  })
  bookTitle: string;

  @ApiProperty({
    example: `Russian Federation, Lenin's street, building 20, apart. 100`,
    description: `user's adress`,
  })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  deliveryAddress: string;

  @ApiProperty({ example: `10-01-2024`, description: `delivery date` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deliveryDate: string;

  @ApiProperty({ example: `in process`, description: `order status` })
  @Column({
    type: DataType.ENUM(OrderStatus.InProcess, OrderStatus.Delivered),
    defaultValue: OrderStatus.InProcess,
  })
  status: OrderStatus;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  bookId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: typeof User;

  @BelongsToMany(() => Book, () => OrderBooks)
  orders: Book[];
}
