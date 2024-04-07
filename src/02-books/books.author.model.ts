import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from './book.model';
import { Author } from 'src/01-authors/author.model';

@Table({ tableName: 'author_books', createdAt: false, updatedAt: false })
export class AuthorBooks extends Model<AuthorBooks> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  bookId: number;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER })
  authorId: number;
}
