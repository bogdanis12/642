import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorToShow!: string;
  errorExist = false;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}"
        ),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      age: new FormControl(null, [Validators.required, Validators.min(18)]),
    });
  }

  onSubmitForm() {
    const { email, password } = this.registerForm.value;
    const userDataToSend: Partial<User> = {
      email: this.email?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      age: this.age?.value,
    };

    this.authService.signUpUser(email, password, userDataToSend).subscribe(
      (data) => console.log(data),
      (error) => {
        this.errorToShow = error["errorMessage"];
        this.errorExist = true;
      }
    );
  }
  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get firstName() {
    return this.registerForm.get("firstName");
  }

  get lastName() {
    return this.registerForm.get("lastName");
  }

  get age() {
    return this.registerForm.get("age");
  }

  getErrorMessageEmail() {
    if (this.email?.hasError("required")) {
      return "This field is required";
    }
    return this.email?.hasError("email") ? "Not a valid email" : "";
  }

  getErrorMessagePassword() {
    if (this.password?.hasError("required")) {
      return "This field is required";
    }
    return this.password?.hasError("minLength")
      ? ""
      : "Your password must be atleast 6 characters";
  }

  getErrorMessageFirstName() {
    if (this.firstName?.hasError("required")) {
      return "This field is required";
    }
    return this.firstName?.hasError("minLength")
      ? ""
      : "Your first name must be at least 2 characters";
  }
  getErrorMessageLastName() {
    if (this.firstName?.hasError("required")) {
      return "This field is required";
    }
    return this.firstName?.hasError("minLength")
      ? ""
      : "Your last name must be at least 2 characters";
  }

  getErrorMessageAge() {
    if (this.age?.hasError("required")) {
      return "This field is required";
    }
    return this.age?.hasError("min") ? "Your age must be 18 years old" : "";
  }
}
