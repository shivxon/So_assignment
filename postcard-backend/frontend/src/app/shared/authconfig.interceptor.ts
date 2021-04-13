import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Redirect } from '../services/redirect.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: Redirect) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `${token.token}`),
    });

    return next.handle(req1);
  }
}
