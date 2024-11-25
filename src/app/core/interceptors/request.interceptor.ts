import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { EmitterService } from '../services/emitter.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private _emitterService: EmitterService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showLoading();

    return next.handle(request).pipe(
      delay(1000),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.hideLoading();
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.hideLoading();
          }
        }
      )
    );
  }

  private showLoading() {
    this._emitterService.loading(true);
  }

  private hideLoading() {
    this._emitterService.loading(false);
  }
}
