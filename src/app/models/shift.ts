interface IShift {
  userId: string;
  shiftName: string;
  beginningTime: string;
  endTime: string;
  date: string;
  profitPerHour: string;
  option: string;
  comment: string;
}

export class Shift implements IShift {
  option = "";
  comment = "";
  userId = "";
  shiftName = "";
  beginningTime = "";
  endTime = "";
  date = "";
  profitPerHour = "";
}
