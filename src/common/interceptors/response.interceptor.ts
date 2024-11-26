import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();
    const httpCode = this.reflector.get('__httpCode__', context.getHandler());
    return next.handle().pipe(
      map((data) => {
        // 如果设置了 @HttpCode 则使用设置的状态码,否则使用默认的 200
        response.status(httpCode ?? 200);
        return new ResData(ResponseCode.Response_success, data, '请求成功');
      }),
    );
  }
}
