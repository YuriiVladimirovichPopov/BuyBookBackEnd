import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Author } from 'src/01-authors/author.model';
import { AuthorBooks } from './books.author.model';
import { Order } from 'src/03-orders/order.model';
import { OrderBooks } from 'src/03-orders/order.books.model';

interface BookCreationAttr {
  title: string;
  description: string;
  publishedDate: Date;
  ISBN: string;
  price: string;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttr> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'title', description: `book's title` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'description', description: `book's description` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '01-01-2024', description: `book's publishedDate` })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  publishedDate: Date;

  // eslint-disable-next-line prettier/prettier
  @ApiProperty({ example: 'ISBN 978-5-93673-265-2', description: `book's ISBN` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  ISBN: string;

  @ApiProperty({ example: '333 bucks', description: `book's price` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @BelongsToMany(() => Author, () => AuthorBooks)
  authors: Author[];

  @BelongsToMany(() => Order, () => OrderBooks)
  orders: Order[];
}