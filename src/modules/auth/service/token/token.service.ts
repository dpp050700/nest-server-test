import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { SecurityConfig } from 'src/config/secret.config';
import { AccessTokenEntity } from '../../entities/access-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accessTokenRepository: Repository<AccessTokenEntity>,
    @Inject(SecurityConfig.KEY) private securityConfig,
  ) {}
  async generateToken(user: UserEntity) {
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    const accessToken = new AccessTokenEntity();
    accessToken.value = token;
    accessToken.expired_at = new Date(
      Date.now() + this.securityConfig.jwtExprire * 1000,
    );
    accessToken.user_id = user.id;
    await this.accessTokenRepository.save(accessToken);

    return token;
  }

  async checkAccessToken(token: string) {
    let isValid = false;
    try {
      await this.verifyAccessToken(token);
      const res = this.accessTokenRepository.findOneBy({
        value: token,
      });
      isValid = Boolean(res);
    } catch (error) {
      console.log(error);
    }
    return isValid;
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verify(token);
  }
}
