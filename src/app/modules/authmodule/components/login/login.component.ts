import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorToShow!: string;
  errorExist = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.signInUser(email, password).subscribe(
      (data) => console.log(data),
      (error) => {
        this.errorToShow = error["errorMessage"];
        this.errorExist = true;
      }
    );
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
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
}
