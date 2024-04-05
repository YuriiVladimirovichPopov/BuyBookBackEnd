import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { AuthorBooks } from 'src/books/autor.books.model';
import { Book } from 'src/books/book.model';

interface AuthorCreationAttr {
  firstName: string;
  lastName: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthorCreationAttr> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  authorId: number;

  @ApiProperty({ example: 'Oleg', description: `author's first name` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: `Ananasenko`, description: `author's last name` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: `bla bla bla`, description: `author's biography` })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  bioraphy: string;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  bookId: number;

  @BelongsToMany(() => AuthorBooks, () => Book)
  books: Book[];
}
