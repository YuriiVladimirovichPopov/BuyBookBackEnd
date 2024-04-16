import { Author } from './model/author.model';

export const authorsProviders = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useValue: Author,
  },
];
