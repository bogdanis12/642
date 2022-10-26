import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of } from "rxjs";

import { Shift } from "../models/shift";
import { adaptResponse } from "../utils";
import { AuthService } from "./auth.service";

export interface ShiftResponse {
  [name: string]: Shift;
}

export type AdaptedShiftResponse = (Shift & { id: string })[];

@Injectable({
  providedIn: "root",
})
export class ShiftService {
  private BASE_URL =
    "https://final-project-angular-2b32c-default-rtdb.europe-west1.firebasedatabase.app/shifts";
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  sendShiftToDB(shift: Shift) {
    return this.httpClient.post(this.BASE_URL, shift);
  }

  getAllShifts() {
    return this.httpClient.get<ShiftResponse>(this.BASE_URL);
  }

  getShiftsByUserId(userId: string) {
    return this.httpClient.get<ShiftResponse>(this.BASE_URL, {
      params: new HttpParams()
        .append("orderBy", '"userId"')
        .append("equalTo", `"${userId}"`),
    });
  }

  getMyShifts() {
    if (this.authService.loggedInUserId) {
      return this.getShiftsByUserId(this.authService.loggedInUserId);
    }
    return of({});
  }

  getShiftById(shiftId: string) {
    return this.httpClient.get<Shift>(this.BASE_URL + "/" + shiftId);
  }

  editShift(shiftId: string, changedShift: Shift) {
    return this.httpClient.patch(this.BASE_URL + "/" + shiftId, changedShift);
  }

  checkIfShiftExist(value: string) {
    return this.getMyShifts().pipe(
      map((response) => {
        const shiftExists = adaptResponse(response).some(
          (shift) => value === shift.shiftName
        );
        if (shiftExists) {
          return { shiftAlreadyExist: true };
        } else {
          return null;
        }
      })
    );
  }
}
