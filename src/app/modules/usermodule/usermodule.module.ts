import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsermoduleRoutingModule } from "./usermodule-routing.module";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { SharedModule } from "../shared/shared.module";
import { UserHomeComponent } from "./components/user-home/user-home.component";

@NgModule({
  declarations: [EditprofileComponent, UserHomeComponent],
  exports: [EditprofileComponent, UserHomeComponent],
  imports: [
    CommonModule,
    UsermoduleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
  ],
})
export class UserModule {}
