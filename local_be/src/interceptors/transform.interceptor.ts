import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data: data.data || data,
        status: context.switchToHttp().getResponse().statusCode,
        pagination: data.totalCount || data.totalPages ? {
          totalCount: data.totalCount || undefined,
          totalPages: data.totalPages || undefined,
        } : undefined,
      }))
    );
  }
}
