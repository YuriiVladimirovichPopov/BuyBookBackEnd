import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Order } from './order.model';
import { Book } from 'src/02-books/model/book.model';

@Table({ tableName: 'order_books', timestamps: false })
export class OrderBooks extends Model {
  @ForeignKey(() => Order)
  @Column({ allowNull: false })
  orderId: number;

  @ForeignKey(() => Book)
  @Column({ allowNull: false })
  bookId: number;
}
