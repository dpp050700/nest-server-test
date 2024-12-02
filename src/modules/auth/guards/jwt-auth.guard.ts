import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { ExtractJwt } from 'passport-jwt';
import { isEmpty } from 'lodash';
import { TokenService } from '../service/token/token.service';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ErrorCodeEnum } from 'src/constants/error-code.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  jwtFromRequestFn = ExtractJwt.fromAuthHeaderAsBearerToken();
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const token = this.jwtFromRequestFn(request);

    let result: any = false;
    console.log('token', token);

    try {
      result = await super.canActivate(context);
    } catch (error) {
      console.log('error', error);
      if (isPublic) {
        return true;
      }
      if (isEmpty(token)) {
        throw new BusinessException(ErrorCodeEnum.USER_UNAUTHORIZED);
      }
      throw new BusinessException(ErrorCodeEnum.TOKEN_INVALID);
    }

    if (result) {
      const isTokenValid = await this.tokenService.checkAccessToken(token);
      if (!isTokenValid) {
        throw new BusinessException(ErrorCodeEnum.TOKEN_INVALID);
      }
    }

    return result;
  }
}
