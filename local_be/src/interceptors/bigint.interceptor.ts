import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class BigIntInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      return next.handle().pipe(
        map((data) => JSON.parse(JSON.stringify(data, (key, value) => {
          return typeof value === 'bigint' ? value.toString() : value;
        }))),
      );
    }
  }