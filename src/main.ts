import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const httpsOptions = {};
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      "http://localhost:8080",
      "https://slang-web.vercel.app"
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI
  })
  await app.listen(3000);
}
bootstrap();
