import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LogsService } from 'src/log/log.service';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logModel: LogsService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestTime = Date.now();

        return next
            .handle()
            .pipe(
                map(async (response) => {
                    const diffTime = Date.now() - requestTime;
                    const ctx = context.switchToHttp();
                    const request = ctx.getRequest<Request>();

                    await this.logModel.createLog({
                        request: {
                            body: request.body,
                            headers: request.headers,
                            method: request.method
                        },
                        response: response,
                        responseTime: diffTime
                    })

                    return response
                }),
            );
    }
}