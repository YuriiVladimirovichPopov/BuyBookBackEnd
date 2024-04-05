import { Sequelize } from 'sequelize-typescript';
import { Author } from 'src/authors/author.model';
import { AuthorBooks } from 'src/books/autor.books.model';
import { Book } from 'src/books/book.model';
import { Order } from 'src/orders/order.model';
import { User } from 'src/users/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD || '1234',
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([User, Book, Author, Order, AuthorBooks]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
export class DataBaseService {}
