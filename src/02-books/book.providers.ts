import { Book } from './book.model';

export const booksProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useValue: Book,
  },
];
