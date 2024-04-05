import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 7755;

  const config = new DocumentBuilder()
    .setTitle('Nest for interview')
    .setDescription('documentation REST API')
    .setVersion('1.0.0')
    .addTag('YuriiPopov')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`listening on port = ${PORT}`));
}
start();
