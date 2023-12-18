import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { RequestValidationError } from '@ts-rest/nest';

export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    // ts-rest bad request exception
    if (exception instanceof RequestValidationError) {
      response.status(status).json({
        message: '요청 유효성 검사 오류입니다.',
        errors: exception.body.errors,
      });
    }

    response.status(status).json({
      message: message,
    });
  }
}
