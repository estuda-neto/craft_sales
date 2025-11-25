import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ControllerAdviceFilter } from './common/filters/controlleradvice.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalFilters(new ControllerAdviceFilter());

  await app.register(fastifyCors, { origin: ['http://localhost:3001', 'http://127.0.0.1:3001'], methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], credentials: true, allowedHeaders: ['Content-Type', 'Authorization'] });
  await app.register(fastifyHelmet);
  await app.register(fastifyMultipart, { limits: { fileSize: 10_000_000 } });

  const uploadPath = join(process.cwd(), 'uploads/users/profile');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
    console.log(`📁 Pasta criada em: ${uploadPath}`);
  }

  app.useGlobalPipes(new ValidationPipe());

  //config swagger docs
  const config = new DocumentBuilder().setTitle("craft sales").setDescription('Documentação da API').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
