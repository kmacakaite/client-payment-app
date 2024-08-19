import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

// await inbound HTTP requests
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // abortOnError to throw an error instead of exiting app
    abortOnError: false,
  });
  app.enableCors();
  await app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000'),
  );
}
bootstrap();
