import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BusinessException } from '../exceptions/business.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor() {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const url = request.url;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;

    const errorCode =
      exception instanceof BusinessException ? exception.errorCode : httpStatus;

    const data = exception.response.data;

    if (
      !(exception instanceof BusinessException) &&
      httpStatus === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      Logger.error(exception, undefined, 'Catch');
    } else {
      this.logger.warn(`error：(${httpStatus}) ${message} : ${decodeURI(url)}`);
    }

    const responseBody = {
      code: errorCode,
      data: data || null,
      message: message,
    };

    response.status(httpStatus).send(responseBody);
  }
}
