import { DynamicModule, Module } from '@nestjs/common';
import { Log4jsService } from './log4js.service';

@Module({
  providers: [Log4jsService],
})
export class Log4jsModule {
  static forRoot(): DynamicModule {
    return {
      module: Log4jsModule,
      providers: [Log4jsService],
      exports: [Log4jsService],
    };
  }
}
