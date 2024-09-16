import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log("============================================")
    console.log(`Request... ${context.switchToHttp().getRequest().method} ${context.switchToHttp().getRequest().url}`);
    return next.handle().pipe(
      tap(() => {
        console.log(`Time... ${Date.now() - now}ms`)
      }),
    );
  }
}
