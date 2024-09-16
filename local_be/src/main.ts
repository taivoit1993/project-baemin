import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BigIntInterceptor } from 'src/interceptors/bigint.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { LoggingInterceptor } from 'src/interceptors/log.interceptor';
import { ErrorsInterceptor } from 'src/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the BAEMIN')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // Configure BigIntInterceptor
  app.useGlobalInterceptors(new BigIntInterceptor());

  // Configure TransformInterceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalInterceptors(new ErrorsInterceptor());

  // Configure LoggingInterceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(8000);
}
bootstrap();
