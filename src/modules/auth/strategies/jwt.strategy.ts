import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfig } from 'src/config/secret.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(SecurityConfig.KEY) securityConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: securityConfig.jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
