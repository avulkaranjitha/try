import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // register global middleware here
  // app.use(cors(), helmet(), mogran(), multer())
  await app.listen(3000);
}
bootstrap();
