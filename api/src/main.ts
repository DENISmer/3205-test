import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(new ValidationPipe())
    .setGlobalPrefix('api')
    .enableCors({ origin: process.env.CORS_ORIGIN });

  await app.listen(process.env.API_PORT ?? 3000);
}

bootstrap();
