import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/02-books/model/book.model';
import { AuthorBooks } from 'src/02-books/model/books.author.model';
import { OrderBooks } from 'src/03-orders/model/order.books.model';
import { Order } from 'src/03-orders/model/order.model';
import { UserAddress } from 'src/05-user-address/model/user.address.model';
import { User } from 'src/04-users/model/user.model';
import { Author } from 'src/01-authors/author.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([
        User,
        Book,
        Author,
        Order,
        AuthorBooks,
        OrderBooks,
        UserAddress,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
export class DataBaseService {}
