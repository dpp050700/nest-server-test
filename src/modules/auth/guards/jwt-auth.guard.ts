import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { ExtractJwt } from 'passport-jwt';
import { isEmpty } from 'lodash';

export class JwtAuthGuard extends AuthGuard('jwt') {
  jwtFromRequestFn = ExtractJwt.fromAuthHeaderAsBearerToken();
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.get(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const token = this.jwtFromRequestFn(request);

    let result = false;

    try {
      result = await super.canActivate(context);
    } catch (error) {
      if (isPublic) {
        return true;
      }

      if (isEmpty(token)) {
        throw new UnauthorizedException('未登录');
      }
      console.log(error);
    }

    console.log('JwtAuthGuard');
    return result;
  }
}
