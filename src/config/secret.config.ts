import { ConfigType, registerAs } from '@nestjs/config';

export const securityRegToken = 'security';

export const SecurityConfig = registerAs(securityRegToken, () => ({
  jwtSecret: 'JWT_SECRET',
  jwtExprire: 60 * 60 * 24,
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
