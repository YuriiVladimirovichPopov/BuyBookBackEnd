import { Sequelize } from 'sequelize-typescript';
import { Author } from 'src/01-authors/author.model';
import { Book } from 'src/02-books/book.model';
import { AuthorBooks } from 'src/02-books/books.author.model';
import { OrderBooks } from 'src/03-orders/order.books.model';
import { Order } from 'src/03-orders/order.model';
import { UserAddress } from 'src/04-users/user.address.model';
import { User } from 'src/04-users/user.model';

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
      sequelize.addModels([
        User,
        Book,
        Author,
        Order,
        UserAddress,
        AuthorBooks,
        OrderBooks,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
export class DataBaseService {}
