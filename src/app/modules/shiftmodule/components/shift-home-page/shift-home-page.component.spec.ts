import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { AdaptedShiftResponse, ShiftService } from "src/app/core/shift.service";
import { RouterTestingModule } from "@angular/router/testing";

import { ShiftHomePageComponent } from "./shift-home-page.component";

describe("ShiftHomePageComponent", () => {
  let component: ShiftHomePageComponent;
  let fixture: ComponentFixture<ShiftHomePageComponent>;
  let element: HTMLElement;
  const MockShiftsService = {
    getMyShifts: (): Observable<AdaptedShiftResponse> =>
      of([
        {
          beginningTime: "11:10",
          date: "2022-07-17",
          endTime: "23:08",
          profitPerHour: "800",
          option: "Home",
          userId: "8hmLzcCoybdEgbm6uZmln9iZujf1",
          id: "123123dcsalfmaldf213",
          shiftName: "task1",
          comment: "-",
        },
        {
          beginningTime: "10:10",
          date: "2022-06-17",
          endTime: "13:08",
          profitPerHour: "22",
          option: "Office",
          userId: "8hmLzcCoybdEgbm6uZmln9iZujf1",
          id: "123123dcsalfmaldf213",
          shiftName: "task1",
          comment: "-",
        },
        {
          beginningTime: "10:10",
          date: "2022-06-17",
          endTime: "13:08",
          profitPerHour: "22",
          option: "Office",
          userId: "8hmLzcCoybdEgbm6uZmln9iZujf1",
          id: "123123dcsalfmaldf213",
          shiftName: "task1",
          comment: "-",
        },
      ]),
  };
  const mockDisplayedColumns: string[] = [
    "Shift Name",
    "Beginning Time",
    "End Time",
    "Date",
    "Profit Per Hour",
    "Profit Per Day",
    "Shift Place",
    "Comments",
  ];

  beforeEach(async () => {
    console.log("be a");
    await TestBed.configureTestingModule({
      declarations: [ShiftHomePageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ShiftService, useValue: MockShiftsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftHomePageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    if (component.userShifts.length) {
      expect(component).toBeTruthy();
    }
  });

  it("should render correctly with three shifts", () => {
    const totalRenderedShifts = element.querySelectorAll(".table-rows");
    expect(totalRenderedShifts.length).toEqual(3);
  });

  it("should render all the names that describes evry column", () => {
    const totalRenderedNames = element.querySelectorAll(".displayed-columns");
    expect(totalRenderedNames.length).toEqual(8);
  });
});
