import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './service/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessTokenEntity } from './entities/access-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const providers = [AuthService, TokenService];

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessTokenEntity]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { jwtSecret, jwtExprire } = configService.get('security');
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: `${jwtExprire}s` },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [...providers, LocalStrategy, JwtStrategy],
  exports: [...providers],
})
export class AuthModule {}
