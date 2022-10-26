import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.css"],
})
export class EditprofileComponent implements OnInit {
  editProfileForm!: FormGroup;
  currentUser!: User;
  idOfUserLoggedIn!: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private currentRoute: ActivatedRoute
  ) {
    this.editProfileForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
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

  ngOnInit(): void {
    const { userId } = this.currentRoute.snapshot.params;
    this.idOfUserLoggedIn = userId;
    if (this.authService.loggedInUserId) {
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) => {
          this.currentUser = Object.values(data)[0];
          console.log(this.currentUser);
          this.editProfileForm.patchValue({
            email: this.currentUser.email,
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            age: this.currentUser.age,
            password: "",
          });
        });
    }
  }

  get firstName() {
    return this.editProfileForm.get("firstName");
  }

  get lastName() {
    return this.editProfileForm.get("lastName");
  }

  get age() {
    return this.editProfileForm.get("age");
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

  onEditProfile() {
    this.userService
      .editProfile(this.idOfUserLoggedIn, {
        ...this.editProfileForm.value,
      })
      .subscribe((data) => console.log(data));
  }
}
