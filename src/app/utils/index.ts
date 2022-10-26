import { ElementRef } from "@angular/core";

import { AdaptedShiftResponse, ShiftResponse } from "../core/shift.service";

export const DEFAULT_DEBOUNCE = 300;

export const adaptResponse = (data: ShiftResponse) =>
  Object.keys(data).map((id) => {
    const currentElement = data[id];
    return {
      ...currentElement,
      id,
    };
  });

export const profitPerShift = (
  shiftStart: string,
  shiftEnd: string,
  wage: string
) => {
  let result = 0;
  const start = new Date();
  const end = new Date();
  const startTimeFormat = new Date(`${start.toDateString()} ${shiftStart}`);
  const endTimeFormat = new Date(`${end.toDateString()} ${shiftEnd}`);
  result = Number(
    Math.round(
      ((endTimeFormat.valueOf() - startTimeFormat.valueOf()) / 1000 / 3600) *
        Number(wage) *
        100
    ) / 100
  );
  return result;
};

export const filterByDate = (
  shifts: AdaptedShiftResponse & { profit?: string },
  dateRangeStart: ElementRef<HTMLInputElement>,
  dateRangeEnd: ElementRef<HTMLInputElement>
) => {
  return (shifts = shifts.filter((shift) => {
    return (
      new Date(shift.date).getTime() >=
        new Date(dateRangeStart.nativeElement.value).getTime() &&
      new Date(shift.date).getTime() <=
        new Date(dateRangeEnd.nativeElement.value).getTime()
    );
  }));
};
