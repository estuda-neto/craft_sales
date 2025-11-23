import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ControllerAdviceFilter } from './common/filters/controlleradvice.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalFilters(new ControllerAdviceFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
