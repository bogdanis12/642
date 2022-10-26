import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes("final-project-angular-2b32c")) {
      const changedRequest = request.clone({
        url: request.url + ".json",
      });
      return next.handle(changedRequest);
    }

    return next.handle(request);
  }
}
