import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum ResponseCode {
  Response_success = 200,
}

export class ResData<T = any> {
  code: ResponseCode;
  data: T;
  message: string;
  constructor(code: number, data: any, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return new ResData(ResponseCode.Response_success, data, '请求成功');
      }),
    );
  }
}
