import { DatabaseConfig, dbRegToken, IDatabaseConfig } from './database.config';
import { SecurityConfig } from './secret.config';

export interface AllConfigType {
  [dbRegToken]: IDatabaseConfig;
}

export default { DatabaseConfig, SecurityConfig };
