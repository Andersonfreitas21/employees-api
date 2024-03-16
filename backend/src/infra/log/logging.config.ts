import pinoHttp from 'pino-http';
import pinoPretty from 'pino-pretty';

import { ILogger } from './interfaces';

export interface ILoggerConfig {
  logger(context: string): ILogger;
  get providerConfig(): {
    logger: any;
    streamingLogger: { write: (msg: string | Buffer) => void };
  };
}

export class LoggingConfig implements ILoggerConfig {
  public get providerConfig() {
    return {
      logger: this.pino,
      streamingLogger: this.streamingLogger,
    };
  }

  public logger(context: string): ILogger {
    const logger = { context };
    return {
      error: (message: any, trace?: any, ...args: any[]) => {
        this.pino.logger.error(logger, message, trace, ...args);
      },

      info: (message: any, ...args: any[]) => {
        this.pino.logger.info(logger, message, ...args);
      },

      warn: (message: any, ...args: any[]) => {
        this.pino.logger.warn(logger, message, ...args);
      },
    };
  }

  private get streamingLogger() {
    return {
      write: (msg: string | Buffer) => {
        pinoPretty({
          colorize: true,
          singleLine: true,
          destination: 1,
        }).write(msg);
      },
    };
  }

  private readonly pino = pinoHttp({
    stream: this.streamingLogger,

    customProps: (req) => {
      return {
        context: 'http',
        session: req['X-Request-Id'],
      };
    },

    customLogLevel: (req, res, error) => {
      if (error) return 'error';
      return 'info';
    },

    customReceivedMessage: (req) => {
      return `Received request: ${req.method} ${req.url}`;
    },

    customSuccessMessage: (req, res, responseTime) => {
      return `Request ${req.id} completed in ${responseTime}ms`;
    },

    customErrorMessage: (req, res, error) => {
      return `Request ${req.id} failed with ${error.message}`;
    },
  });
}
