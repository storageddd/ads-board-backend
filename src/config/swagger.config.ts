import { type NestApplication } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function configureSwagger(app: NestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Ads API')
    .setDescription('Ads service REST API')
    .setVersion(process.env.npm_package_version)
    .addTag('Authorization', 'User authorization')
    .addTag('Users', 'User operations')
    .addTag('Categories', 'Category operations')
    .addTag('Advertisements', 'Advertisement operations')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Ads API',
    jsonDocumentUrl: 'api/swagger.json',
    yamlDocumentUrl: 'api/swagger.yaml',
    swaggerOptions: {
      displayOperationId: true,
    },
  };

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, customOptions);
}
