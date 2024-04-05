import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Author } from 'src/authors/author.model';
import { Book } from './book.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: `author_s books`, createdAt: false, updatedAt: false })
export class AuthorBooks extends Model<AuthorBooks> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: `authors`, description: `book's authors` })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  authors: [];

  @ForeignKey(() => Book)
  @Column({ type: DataType.NUMBER })
  bookId: number;

  @ForeignKey(() => Author)
  @Column({ type: DataType.NUMBER })
  authorId: number;

  @BelongsToMany(() => Author, () => Book)
  author: Author;
}
