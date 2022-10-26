import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { debounceTime, filter, fromEvent } from "rxjs";

import { AdaptedShiftResponse, ShiftService } from "src/app/core/shift.service";
import { Routes } from "src/app/models/locales";
import { Shift } from "src/app/models/shift";
import {
  adaptResponse,
  DEFAULT_DEBOUNCE,
  filterByDate,
  profitPerShift,
} from "src/app/utils";

@Component({
  selector: "app-shift-home-page",
  templateUrl: "./shift-home-page.component.html",
  styleUrls: ["./shift-home-page.component.css"],
})
export class ShiftHomePageComponent implements OnInit, AfterViewInit {
  userShifts: AdaptedShiftResponse = [];
  localShifts: AdaptedShiftResponse & { profit?: string } = [];
  profitShifts: string[] = [];
  isLoading = false;
  @ViewChild("input") input!: ElementRef<HTMLInputElement>;
  @ViewChild("dateRangeStart") dateRangeStart!: ElementRef<HTMLInputElement>;
  @ViewChild("dateRangeEnd") dateRangeEnd!: ElementRef<HTMLInputElement>;
  @ViewChild("option") option!: ElementRef<HTMLSelectElement>;

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

  options = [
    { value: "Home", viewValue: "Home" },
    { value: "Office", viewValue: "Office" },
  ];

  constructor(private shiftService: ShiftService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.shiftService.getMyShifts().subscribe((getShiftsResponse) => {
      this.isLoading = false;
      this.userShifts = adaptResponse(getShiftsResponse);
      this.localShifts = this.userShifts;
      this.localShifts.map((shift) => {
        this.profitShifts.push(this.profit(shift).toString());
        if (shift.comment === "") {
          shift.comment = "-";
        }
      });
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(debounceTime(DEFAULT_DEBOUNCE), filter(Boolean))
      .subscribe((keyupEvent) => {
        const inputTarget = keyupEvent.target as HTMLInputElement;
        this.localShifts = this.userShifts;
        this.localShifts = this.userShifts.filter(
          (shift) =>
            shift.shiftName.includes(inputTarget.value) ||
            shift.option.toLowerCase().includes(inputTarget.value)
        );
      });
  }

  profit(shift: Shift) {
    return profitPerShift(
      shift.beginningTime,
      shift.endTime,
      shift.profitPerHour
    );
  }
  onApply() {
    this.localShifts = this.userShifts;
    this.localShifts = filterByDate(
      this.localShifts,
      this.dateRangeStart,
      this.dateRangeEnd
    );
  }

  onClear() {
    this.dateRangeEnd.nativeElement.value = "";
    this.dateRangeStart.nativeElement.value = "";
    this.localShifts = this.userShifts;
  }

  onAddShift() {
    this.router.navigate([Routes.ADD_SHIFT]);
  }

  selectShiftToEdit(shiftToEdit: Shift & { id: string }) {
    this.router.navigate([Routes.EDIT_SHIFT, shiftToEdit.id]);
  }
}
