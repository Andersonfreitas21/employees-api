import { readFileSync } from 'node:fs';
import { enum as zEnum, string as zString, z } from 'zod';

export interface IEnvService {
  get(key: keyof Config): string;
}

type Config = z.infer<typeof EnvService.schema>;

export class EnvService implements IEnvService {
  private readonly config: Config;

  constructor() {
    const nodeEnvNotExists = !process.env.NODE_ENV;
    if (nodeEnvNotExists) {
      console.log('Loading .env file');
      const envConfig = readFileSync('.env');

      const removeComments = envConfig
        .toString()
        .replace(/^(?:(\s*)?#).*/gm, '');

      const parsedEnv = removeComments
        .match(/(?<envName>\w+)\s*=\s*(?<value>.*)/gm)
        .reduce((obj, match) => {
          const [envName, value] = match.split('=');
          const trimValue = value.trim();
          const newValue =
            trimValue.startsWith('"') || trimValue.startsWith("'")
              ? trimValue.slice(1, -1)
              : trimValue;

          obj[envName.trim()] = newValue;
          return obj;
        }, {});

      process.env = { ...process.env, ...parsedEnv };
    }
    this.config = EnvService.schema.parse(process.env);
  }

  get(key: keyof Config): string {
    return this.config[key];
  }

  static get schema() {
    return z.object({
      NODE_ENV: zEnum(['DEV', 'PRD', 'TEST', 'HOM']),
      API_PORT: zString().describe('Server port - 3000'),
      MONGO_DB_CONN_STRING: zString().describe('Mongo connection string'),
    });
  }
}
