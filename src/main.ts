import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Log4jsService } from './utils/log4js/log4js.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  const logger = app.get(Log4jsService);
  app.useLogger(logger);
  app.enableCors(options);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(Object.values(errors[0].constraints)[0]);
      },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.EXPRESS_PORT);
}
bootstrap();
