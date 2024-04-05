import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/exception.filter';

export const appSettings = (app: INestApplication) => {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory(errors) {
        console.log('Validation errors:', errors);
        const errorsForResp = [];
        errors.forEach((error) => {
          if (error && error.property && error.constraints) {
            const keys = Object.keys(error.constraints);
            keys.forEach((key) => {
              errorsForResp.push({
                message: error.constraints[key],
                field: error.property,
              });
            });
          } else {
            if (error) {
              errorsForResp.push({
                message: 'Validation failed',
                field: error.property,
              });
            } else {
              errorsForResp.push({
                message: 'Validation failed',
                field: undefined,
              });
            }
          }
        });
        throw new BadRequestException(errorsForResp);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
};
