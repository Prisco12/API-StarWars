import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogsService } from 'src/log/log.service';

@Injectable()
export class ExceptionLoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ExceptionLoggingInterceptor.name);
    constructor(private readonly logModel: LogsService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestTime = Date.now();
        return next.handle().pipe(
            catchError((err) => {
                const diffTime = Date.now() - requestTime;

                const ctx = context.switchToHttp();
                const request = ctx.getRequest<Request>();
                this.logModel.createLog({
                    request: {
                        body: request.body,
                        headers: request.headers,
                        method: request.method
                    },
                    error: err,
                    responseTime: diffTime
                })

                return throwError(() => err);
            }),
        );
    }
}