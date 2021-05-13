import { ConfigService } from '@nestjs/config';
import { Injectable, LoggerService } from '@nestjs/common';
import { getLogger, Logger, configure, shutdown } from 'log4js';
import buildConfig from '../../config/log4js';

@Injectable()
export class Log4jsService implements LoggerService {
  private loggers: Map<string, Logger>;
  constructor(private readonly configService: ConfigService) {
    this.loggers = new Map();

    const option = buildConfig(
      this.configService.get('LOG_LEVEL'),
      this.configService.get('PM'),
    );
    configure(option);
  }

  getLogger(loggerName = 'APP'): Logger {
    let logger = this.loggers.get(loggerName);
    if (!logger) {
      logger = getLogger(loggerName);
      this.loggers.set(loggerName, logger);
    }
    return logger;
  }

  log(message: any, context?: string) {
    this.getLogger(context).info(message);
  }

  error(message: any, trace?: string, context?: string) {
    this.getLogger(context).error(message, trace);
  }

  warn(message: any, context?: string) {
    this.getLogger(context).warn(message);
  }

  debug(message: any, context?: string) {
    this.getLogger(context).debug(message);
  }

  flushall(cb?: () => void) {
    shutdown(() => {
      cb && cb();
    });
  }
}
