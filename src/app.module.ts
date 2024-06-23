import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StarwarsModule } from './starwars/starwars.module';
import { PeopleModule } from './people/people.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LogModel } from './log/log.model';
import { LogModule } from './log/log.module';
import { Log, LogSchema } from './log/schemas/log.schema';
import { ExceptionLoggingInterceptor } from './common/interceptors/exception.interceptor';
import { TimeInterceptor } from './common/interceptors/time.interceptor';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), StarwarsModule, PeopleModule, AuthModule, UsersModule,
    LogModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, 
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('people');
  }
}
