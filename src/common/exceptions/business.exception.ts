import { HttpException, HttpStatus } from '@nestjs/common';
import { ResData } from '../interceptors/response.interceptor';

export class BusinessException extends HttpException {
  constructor(code: any, data: any, message: any) {
    const resdata = new ResData(code, data, message);
    super(
      HttpException.createBody(resdata as Record<string, any>),
      HttpStatus.OK,
    );
  }
}
