import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ControllerAdviceFilter } from './common/filters/controlleradvice.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Plugins Fastify
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // Global filters & pipes
  app.useGlobalFilters(new ControllerAdviceFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  // Fastify server instance (RAW)
  const fastify = app.getHttpAdapter().getInstance();

  // CORS
  await app.register(fastifyCors, {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Helmet (config especial para imagens)
  await app.register(fastifyHelmet, { contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], imgSrc: ["'self'", "data:", "blob:", "*"], }, } });

  // Multipart (upload)
  await app.register(multipart);

  // Static files
  await app.register(fastifyStatic, {
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  });

  // Garantir que o Next.js consiga carregar imagens
  fastify.addHook('onSend', (req, reply, payload, done) => {
    reply.header('Cross-Origin-Resource-Policy', 'cross-origin');
    reply.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    done();
  });

  // Criar diretórios de upload se não existirem
  const uploadPath = join(process.cwd(), 'uploads/users/profile');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
    console.log(`📁 Pasta criada em: ${uploadPath}`);
  }

  // Swagger
  const config = new DocumentBuilder().setTitle('craft sales').setDescription('Documentação da API').setVersion('1.0').addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Informe o token JWT',
      in: 'header',
    },
    'jwt',
  )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Start
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
