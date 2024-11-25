import { DatabaseConfig, dbRegToken, IDatabaseConfig } from './database.config';

export interface AllConfigType {
  [dbRegToken]: IDatabaseConfig;
}

export default { DatabaseConfig };
