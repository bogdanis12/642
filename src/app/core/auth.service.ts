import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, catchError, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

import { Session } from "../models/session.model";
import { User } from "../models/user";
import { getSessionFromLS } from "../utils/session.util";
import { UserService } from "./user.service";
import { clearSessionFromLS } from "../utils/session.util";
import { Router } from "@angular/router";
import { Routes } from "../models/locales";

interface ISignUpResponse {
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
}
interface ILoginResponse extends ISignUpResponse {
  registered: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}
  public userDataRegister: ISignUpResponse = {
    email: "",
    idToken: "",
    kind: "",
    localId: "",
    expiresIn: "",
    refreshToken: "",
  };
  private SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`;
  private SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;
  public session = new BehaviorSubject<Session | null>(getSessionFromLS());
  signUpUser(email: string, password: string, userDetails: Partial<User>) {
    return this.httpClient
      .post<ISignUpResponse>(this.SIGNUP_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleAuthErrors),
        switchMap((authResponse) => {
          const currentSession = new Session(
            authResponse.localId,
            authResponse.idToken,
            authResponse.email
          );
          localStorage.setItem(
            "currentSession",
            JSON.stringify(currentSession)
          );
          this.session.next(currentSession);
          this.router.navigate([Routes.HOME]);
          return this.userService.sendUserDetailsToDb({
            ...userDetails,
            id: authResponse.localId,
          });
        })
      );
  }

  signInUser(email: string, password: string) {
    return this.httpClient
      .post<ILoginResponse>(this.SIGNIN_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleAuthErrors),
        tap((signInResponse) => {
          console.log(">>>>", signInResponse);
          const currentSession = new Session(
            signInResponse.localId,
            signInResponse.idToken,
            signInResponse.email
          );
          console.log("session", currentSession);
          localStorage.setItem(
            "currentSession",
            JSON.stringify(currentSession)
          );
          this.session.next(currentSession);
          this.router.navigate([Routes.HOME]);
        })
      );
  }

  get loggedInUserId() {
    return this.session.getValue()?.id;
  }

  get userEmail() {
    return this.session.getValue()?.email;
  }

  logOut() {
    clearSessionFromLS();
    this.session.next(null);
  }

  private handleAuthErrors(authError: HttpErrorResponse) {
    const errorID = authError.error.error.message;
    let errorMessage;
    switch (errorID) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists";
        break;
      case "INVALID_EMAIL":
        errorMessage = "Email not valid";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email not found";
        break;
      default:
        errorMessage = "Email or password are incorrect";
    }
    return throwError({ authError, errorMessage });
  }
}
