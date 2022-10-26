import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/core/auth.service";
import { ShiftService } from "src/app/core/shift.service";
import { UserService } from "src/app/core/user.service";
import { LinksToNavigate, NavBar, Routes } from "src/app/models/locales";
import { adaptResponse } from "src/app/utils";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn = false;
  userEmail!: string;
  isUserNew = false;
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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private shiftService: ShiftService
  ) {
    this.isUserLoggedIn = !!this.authService.loggedInUserId;
    console.log(">>>>", this.isUserLoggedIn);
  }

  onLogOutClick() {
    this.authService.logOut();
  }

  ngOnInit(): void {
    if (this.authService.loggedInUserId && this.authService.userEmail) {
      this.userEmail = this.authService.userEmail;
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) => {
          const userIdentifierInDB = Object.keys(data)[0];
          this.routePaths.EDIT_PROFILE =
            Routes.EDIT_PROFILE + `/${userIdentifierInDB}`;
        });
      this.shiftService.getMyShifts().subscribe((data) => {
        if (adaptResponse(data).length === 0) {
          this.isUserNew = true;
        } else {
          this.isUserNew = false;
        }
      });
    }
  }
}
