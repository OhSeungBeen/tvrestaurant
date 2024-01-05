import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { RequestValidationError } from '@ts-rest/nest';
import { Prisma } from '@tvrestaurant/database';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status;
    let body;

    if (exception instanceof RequestValidationError) {
      // ts-rest 400(bad request) exception
      status = exception.getStatus();

      const errorTypes = ['query', 'body', 'pathParams', 'headers'];
      const errors = {};
      errorTypes.forEach((errorType) => {
        if (exception[errorType]) {
          errors[errorType] = exception[errorType].errors;
        }
      });
      body = {
        message: '요청 유효성 검사 오류입니다.',
        errors,
      };
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // prisma exception
      switch (exception.code) {
        case 'P2002': {
          status = HttpStatus.CONFLICT;
          body = {
            message: '데이터 중복 오류입니다.',
          };
          break;
        }
        default: {
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          body = {
            message: '내부 서버 오류입니다.',
          };
        }
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      body = {
        message: exception.message,
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      body = {
        message: '내부 서버 오류입니다.',
      };
    }

    response.status(status).json(body);
  }
}
