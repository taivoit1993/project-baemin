import {
    CallHandler,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    NestInterceptor,
  } from '@nestjs/common';
  import { catchError, Observable } from 'rxjs';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((err) => {
          throw new InternalServerErrorException(err.message);
        }),
      );
    }
  }
  