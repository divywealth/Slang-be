import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  console.log(process.env.NODE_ENV, process.env.JWT_SECRET)
  await app.listen(3000);
}
bootstrap();
