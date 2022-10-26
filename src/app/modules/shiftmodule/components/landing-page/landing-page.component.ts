import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/auth.service";
import { AdaptedShiftResponse, ShiftService } from "src/app/core/shift.service";
import { UserService } from "src/app/core/user.service";
import { Routes } from "src/app/models/locales";
import { User } from "src/app/models/user";
import { adaptResponse, profitPerShift } from "src/app/utils";
import {
  filterThisWeekShifts,
  filterUpcomingShifts,
  IMyProfitObj,
  mostProfitableMonth,
} from "src/app/utils/shifts.utils";
import { Shift } from "../../../../models/shift";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {
  thisWeekShifts: (AdaptedShiftResponse & { profit?: string }) | Shift[] = [];
  upcomingShifts: (AdaptedShiftResponse & { profit?: string }) | Shift[] = [];
  myShifts: AdaptedShiftResponse & { profit?: string } = [];
  users!: User[];
  usersId!: string[];
  isAdmin!: boolean;
  isLoading = false;
  myProfitArray: IMyProfitObj[] = [];
  messageToDisplayForMostProfit = "";
  allShifts: (AdaptedShiftResponse & { profit?: string }) | Shift[] = [];
  displayedColumns: string[] = [
    "Shift Name",
    "Beginning Time",
    "End Time",
    "Date",
    "Profit Per Hour",
    "Profit Per Day",
    "Shift Place",
    "Comments",
  ];
  displayedColumnsUsers: string[] = ["Email", "Last Name", "First Name", "Age"];

  constructor(
    private shiftService: ShiftService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.shiftService.getMyShifts().subscribe((shifts) => {
      this.isLoading = false;
      this.myShifts = adaptResponse(shifts);
      this.thisWeekShifts = adaptResponse(shifts);
      this.upcomingShifts = adaptResponse(shifts);
      this.thisWeekShifts = filterThisWeekShifts(adaptResponse(shifts));
      this.upcomingShifts = filterUpcomingShifts(adaptResponse(shifts));
      this.checkIfUserIsAdmin();
      this.messageToDisplayForMostProfit = mostProfitableMonth(
        this.myProfitArray,
        this.myShifts
      );
      if (this.myShifts.length === 0 && this.isAdmin === false) {
        this.router.navigate(["/shifts/my-shifts"]);
      }
      this.putLineForEmptyComments(this.thisWeekShifts);
      this.putLineForEmptyComments(this.upcomingShifts);
    });
    this.shiftService.getAllShifts().subscribe((data) => {
      this.isLoading = false;
      this.allShifts = adaptResponse(data);
      this.putLineForEmptyComments(this.allShifts);
    });
  }

  selectShiftToEdit(shiftToEdit: Shift & { id?: string }) {
    console.log(shiftToEdit.id);
    this.router.navigate([Routes.EDIT_SHIFT, shiftToEdit.id]);
  }

  profit(shift: Shift) {
    return profitPerShift(
      shift.beginningTime,
      shift.endTime,
      shift.profitPerHour
    );
  }

  checkIfUserIsAdmin() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = Object.values(data);
      this.usersId = Object.keys(data);
      this.users.map((user) => {
        if (
          this.authService.loggedInUserId === user.id &&
          user.isAdmin === true
        ) {
          this.isAdmin = user.isAdmin;
          console.log(this.isAdmin);
          return this.isAdmin;
        }
        return this.isAdmin;
      });
    });
  }

  putLineForEmptyComments(
    shifs: (AdaptedShiftResponse & { profit?: string }) | Shift[]
  ) {
    shifs.map((shift) => {
      if (shift.comment === "") {
        shift.comment = "-";
      }
    });
  }

  onAddShift() {
    this.router.navigate([Routes.ADD_SHIFT]);
  }
}
