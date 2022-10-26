import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/auth.service";
import { AdaptedShiftResponse, ShiftService } from "src/app/core/shift.service";
import { Routes } from "src/app/models/locales";
import { ShiftNameValidator } from "src/app/utils/slug-name.validator";

import * as moment from "moment";

@Component({
  selector: "app-addshift",
  templateUrl: "./addshift.component.html",
  styleUrls: ["./addshift.component.css"],
})
export class AddshiftComponent {
  addShiftForm!: FormGroup;
  userShifts: AdaptedShiftResponse = [];
  @ViewChild("input") input!: ElementRef<HTMLInputElement>;
  options = [
    { value: "Home", viewValue: "Home" },
    { value: "Office", viewValue: "Office" },
  ];
  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private router: Router
  ) {
    this.addShiftForm = new FormGroup({
      shiftName: new FormControl(
        null,
        [Validators.required],
        [ShiftNameValidator.createValidator(this.shiftService)]
      ),
      beginningTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      profitPerHour: new FormControl(null, Validators.required),
      option: new FormControl(null, Validators.required),
      comment: new FormControl(""),
    });
  }

  onAddShift() {
    this.shiftService
      .sendShiftToDB({
        ...this.addShiftForm.value,
        userId: this.authService.loggedInUserId,
        date: moment(this.addShiftForm.get("date")?.value)
          .utc()
          .local()
          .format("YYYY-MM-DD"),
      })
      .subscribe(() => {
        this.router.navigate([Routes.HOME]);
      });
  }
}
