import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { type NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './config/swagger.config';

async function bootstrap() {
  const isDev = process.env.NODE_ENV === 'development';

  let httpConfig;

  if (isDev) {
    httpConfig = {
      key: readFileSync(process.env.SSL_KEY_PATH),
      cert: readFileSync(process.env.SSL_CERT_PATH),
    } as HttpsOptions;
  }

  const app: NestApplication = await NestFactory.create(AppModule, {
    httpsOptions: httpConfig,
  });

  app.setGlobalPrefix('/api');
  app.enableCors();

  configureSwagger(app);

  await app.listen(3000);
}

bootstrap();
