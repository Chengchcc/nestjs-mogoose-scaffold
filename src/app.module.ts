import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CatModule } from './modules/cat/cat.module';
import { Log4jsModule } from './utils/log4js/log4js.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${ENV}`],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => {
        const servername = configService.get('MONGODB_SERVER');
        const port = configService.get('MONGODB_PORT');
        const database = configService.get('MONGODB_DATABASE');
        const user = configService.get('MONGODB_USER');
        const pass = configService.get('MONGODB_PASS');
        const uri = `mongodb://${servername}:${port}/${database}`;
        return {
          uri: uri,
          user: user,
          pass: pass,
          useCreateIndex: true,
          useFindAndModify: true,
        };
      },
      inject: [ConfigService],
    }),
    CatModule,
    Log4jsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
