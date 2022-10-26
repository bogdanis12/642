import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, first, switchMap } from "rxjs/operators";
import { DEFAULT_DEBOUNCE } from ".";

import { ShiftService } from "../core/shift.service";

export class ShiftNameValidator {
  static createValidator(shiftService: ShiftService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // return shiftService
      //   .checkIfShiftExist(control.value)
      //   .pipe(
      //     map((result: boolean) =>
      //       result ? { shiftAlreadyExist: true } : null
      //     )
      //   );
      return control.valueChanges.pipe(
        debounceTime(DEFAULT_DEBOUNCE),
        switchMap((value) => {
          return shiftService.checkIfShiftExist(value);
        }),
        first()
      );
    };
  }
}
