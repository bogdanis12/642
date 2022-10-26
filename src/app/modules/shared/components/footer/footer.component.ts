import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";
import { LinksToNavigate, NavBar, Routes } from "src/app/models/locales";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  linksToNavigate: LinksToNavigate = {
    HOME: NavBar.HOME,
    LOGIN: NavBar.LOGIN,
    REGISTER: NavBar.REGISTER,
    EDIT_PROFILE: NavBar.EDIT_PROFILE,
    ADD_SHIFT: NavBar.ADD_SHIFT,
    EDIT_SHIFT: NavBar.EDIT_SHIFT,
    LOGOUT: NavBar.LOGOUT,
    MY_SHIFTS: NavBar.MY_SHIFTS,
  };

  routePaths: LinksToNavigate = {
    HOME: Routes.HOME,
    LOGIN: Routes.LOGIN,
    REGISTER: Routes.REGISTER,
    EDIT_PROFILE: Routes.EDIT_PROFILE,
    ADD_SHIFT: Routes.ADD_SHIFT,
    EDIT_SHIFT: Routes.EDIT_SHIFT,
    LOGOUT: Routes.LOGOUT,
    MY_SHIFTS: Routes.MY_SHIFTS,
  };

  resources = {
    name: {
      firebase: "firebase",
      angular: "angular",
      angularMaterial: "angular material",
      stackoverflow: "stackoverflow",
    },
    path: {
      firebase: "https://firebase.google.com/",
      angular: "https://angular.io/",
      angularMaterial: "https://material.angular.io/",
      stackoverflow: "https://stackoverflow.com/",
    },
  };

  columnTitle = {
    usefullLinks: "Usefull Links",
    resources: "Resources",
  };

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedInUserId) {
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) => {
          const userIdentifierInDB = Object.keys(data)[0];
          this.routePaths.EDIT_PROFILE =
            Routes.EDIT_PROFILE + `/${userIdentifierInDB}`;
        });
    }
  }
}
