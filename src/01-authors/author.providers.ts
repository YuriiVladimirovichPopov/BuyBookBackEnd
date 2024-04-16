import { Author } from './author.model';

export const authorsProviders = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useValue: Author,
  },
];
