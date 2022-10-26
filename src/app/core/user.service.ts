import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "../models/locales";

import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private BASE_URL =
    "https://final-project-angular-2b32c-default-rtdb.europe-west1.firebasedatabase.app/users";

  sendUserDetailsToDb(user: Partial<User>) {
    return this.httpClient.post(this.BASE_URL, user);
  }

  getAllUsers() {
    return this.httpClient.get(this.BASE_URL);
  }

  getUserById(userId: string) {
    return this.httpClient.get(this.BASE_URL, {
      params: {
        orderBy: '"id"',
        equalTo: `"${userId}"`,
      },
    });
  }

  editProfile(userId: string, changedUser: User) {
    this.router.navigate([Routes.HOME]);
    return this.httpClient.patch(this.BASE_URL + "/" + userId, changedUser);
  }
}
