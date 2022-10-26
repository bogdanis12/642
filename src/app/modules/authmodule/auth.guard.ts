import { Injectable } from "@angular/core";
import { CanActivateChild, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "src/app/core/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const currentToken = this.authService.session.getValue();
    console.log(currentToken);
    if (!currentToken) {
      this.router.navigate(["auth"]);
    }
    return !!currentToken;
  }
}
