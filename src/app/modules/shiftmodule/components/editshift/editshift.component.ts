import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ShiftService } from "src/app/core/shift.service";
import { IOption, Routes } from "src/app/models/locales";
import { Shift } from "src/app/models/shift";

import * as moment from "moment";

@Component({
  selector: "app-editshift",
  templateUrl: "./editshift.component.html",
  styleUrls: ["./editshift.component.css"],
})
export class EditshiftComponent implements OnInit {
  currentShift!: Shift;
  editShiftForm!: FormGroup;
  idOfShift!: string;
  options: IOption[] = [
    { value: "Home", viewValue: "Home" },
    { value: "Office", viewValue: "Office" },
  ];

  constructor(
    private shiftService: ShiftService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editShiftForm = new FormGroup({
      shiftName: new FormControl(null, [Validators.required]),
      beginningTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      profitPerHour: new FormControl(null, Validators.required),
      option: new FormControl(null, Validators.required),
      comment: new FormControl(""),
    });
  }

  ngOnInit(): void {
    const { shiftId } = this.currentRoute.snapshot.params;
    this.idOfShift = shiftId;
    this.shiftService.getShiftById(shiftId).subscribe((data) => {
      this.currentShift = data;
      console.log(this.currentShift);
      if (this.currentShift) {
        this.editShiftForm.patchValue({
          shiftName: this.currentShift.shiftName,
          beginningTime: this.currentShift.beginningTime,
          endTime: this.currentShift.endTime,
          date: this.currentShift.date,
          profitPerHour: this.currentShift.profitPerHour,
          option: this.currentShift.option,
          comment: this.currentShift.comment,
        });
      }
    });
  }

  editShift() {
    this.shiftService
      .editShift(this.idOfShift, {
        ...this.editShiftForm.value,
        date: moment(this.editShiftForm.get("date")?.value)
          .utc()
          .local()
          .format("YYYY-MM-DD"),
      })
      .subscribe(() => {
        this.router.navigate([Routes.HOME]);
      });
  }
}
