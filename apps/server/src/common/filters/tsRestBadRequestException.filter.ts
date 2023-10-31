import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { RequestValidationError } from '@ts-rest/nest';

@Catch(RequestValidationError)
export class TsRestBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: RequestValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      message: exception.message,
      errors: exception.body.errors,
    });
  }
}
