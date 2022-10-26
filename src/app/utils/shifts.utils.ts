import * as moment from "moment";
import { profitPerShift } from ".";
import { AdaptedShiftResponse } from "../core/shift.service";
import { Shift } from "../models/shift";

export interface gigel {
  [key: string]: number;
}

export interface IMyProfitObj {
  month: string;
  profitMonth: number;
}

export interface IProfitableMonth {
  month: number;
}

export const isShiftThisWeek = (currentShiftDate: string) => {
  const weekStart = moment().clone().startOf("isoWeek");
  const weekEnd = moment().clone().endOf("isoWeek");
  const currentShiftMomentTime = moment(currentShiftDate);

  return currentShiftMomentTime.isBetween(weekStart, weekEnd);
};
export const isShiftUpcoming = (currentShiftDate: string) => {
  const currentShiftMomentTime = moment(currentShiftDate);

  return currentShiftMomentTime.isAfter(moment());
};

export const filterThisWeekShifts = (shifts: Shift[]): Shift[] | [] => {
  return shifts.filter((shift) => isShiftThisWeek(shift.date));
};

export const filterUpcomingShifts = (shifts: Shift[]): Shift[] | [] => {
  return shifts.filter((shift) => isShiftUpcoming(shift.date));
};

export const mostProfitableMonth = (
  myProfitArray: IMyProfitObj[],
  shifts: AdaptedShiftResponse & { profit?: string }
) => {
  shifts.map((shift) => {
    const month = new Date(shift.date).toLocaleString("default", {
      month: "long",
    });
    const myProfitObj: IMyProfitObj = {
      month: month,
      profitMonth: profitPerShift(
        shift.beginningTime,
        shift.endTime,
        shift.profitPerHour
      ),
    };
    myProfitArray.push(myProfitObj);
  });
  const profitableMonth = myProfitArray.reduce((accumulator, currentvalue) => {
    const month = currentvalue.month;
    const lastValue = isNaN(accumulator[month]) ? 0 : accumulator[month];
    return {
      ...accumulator,
      [month]: lastValue + Number(currentvalue.profitMonth),
    };
  }, {} as gigel);
  console.log(profitableMonth);
  const values = Object.values(profitableMonth);
  const max = values.reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue);
  }, 0);
  console.log("max: ", max);
  let messageToDisplay = "";
  for (const [key, value] of Object.entries(profitableMonth)) {
    if (max === value) {
      messageToDisplay = `Your most profitable month is ${key} with ${max.toFixed(
        2
      )}$`;
    }
  }
  console.log(messageToDisplay);
  return messageToDisplay;
};
