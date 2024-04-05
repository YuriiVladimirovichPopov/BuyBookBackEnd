import { Module } from '@nestjs/common';
import { databaseProviders } from './data-base.service';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DataBaseModule {}
