import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { injectable } from 'inversify';
import { Configuration } from './config';

@injectable()
class ConfigurationService implements Configuration {
  private readonly config!: DotenvParseOutput;

  constructor() {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      console.error('[ConfigService] The .env file could not be read or is missing');
    } else {
      console.log('[ConfigService]: .env file loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key as string];
  }
}

export { ConfigurationService };
