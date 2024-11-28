import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { SecurityConfig } from 'src/config/secret.config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SecurityConfig.KEY) private securityConfig,
  ) {}
  async generateToken(user: UserEntity) {
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
    return token;
  }
}
