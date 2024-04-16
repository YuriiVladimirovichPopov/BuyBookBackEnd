import { Book } from './model/book.model';

export const booksProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useValue: Book,
  },
];
