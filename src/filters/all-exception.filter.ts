import {
  ArgumentsHost,
  Catch,
  Logger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception);
    const msg = `${exception.toString()}` ?? 'unknown error';

    const logFormat = `
      Request original url:  ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status code: ${statusCode}
      Response: ${msg}`;

    this.logger.error(logFormat);

    return response.status(200).json({
      code: statusCode,
      data: null,
      msg: `${msg}`,
    });
  }
}
