import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";

import { catchError, Observable, throwError } from "rxjs";

import { AuthService } from "../core/auth.service";
import { Routes } from "../models/locales";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentSession = this.authService.session.getValue();
    const currentToken = currentSession?.token;
    if (currentToken) {
      const requestWithAuth = request.clone({
        params: request.params.append("auth", currentToken),
      });
      return next.handle(requestWithAuth).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logOut();
            this.router.navigate([Routes.LOGIN], {
              queryParams: { error: "unauthorized" },
            });
          }
          return throwError(() => new Error(error.message));
        })
      );
    }

    return next.handle(request);
  }
}
