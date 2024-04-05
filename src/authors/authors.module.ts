import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { authorsProviders } from './author.providers';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, ...authorsProviders],
})
export class AuthorsModule {}
