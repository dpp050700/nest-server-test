import { HttpException, HttpStatus } from '@nestjs/common';
import { ResData } from '../interceptors/response.interceptor';
import { ErrorCodeEnum } from 'src/constants/error-code.constant';

export class BusinessException extends HttpException {
  private code: number;
  constructor(error: ErrorCodeEnum | string, data?: any) {
    let code: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = error;
    if (error.includes(':')) {
      code = parseInt(error.split(':')[0]);
      message = error.split(':')[1];
    }
    const resBody = new ResData(code, data, message);
    super(
      HttpException.createBody(resBody as Record<string, any>),
      HttpStatus.OK,
    );
    this.code = code;
  }

  get errorCode() {
    return this.code;
  }
}
