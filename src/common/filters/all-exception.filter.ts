import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor() {} // private readonly httpAdapterHost: HttpAdapterHost, // private readonly logger: LoggerService,
  catch(exception: any, host: ArgumentsHost) {
    // const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg: any = exception['response'];

    console.log(httpStatus);

    const responseBody = {
      code: msg.code,
      data: msg.data,
      message: 'error',
    };

    this.logger.error('[error]', responseBody);

    // console.log(responseBody);

    response.status(httpStatus).send(responseBody);
    // httpAdapter.reply(response, responseBody, httpStatus);
  }
}
