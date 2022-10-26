import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShiftRoutingModule } from "./shiftmodule-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../shared/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { MatIconModule } from "@angular/material/icon";

import { AddshiftComponent } from "./components/addshift/addshift.component";
import { EditshiftComponent } from "./components/editshift/editshift.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ShiftHomePageComponent } from "./components/shift-home-page/shift-home-page.component";
@NgModule({
  declarations: [
    AddshiftComponent,
    EditshiftComponent,
    HomepageComponent,
    ShiftHomePageComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule,
    SharedModule,
    MatIconModule,
  ],
  exports: [
    ShiftHomePageComponent,
    AddshiftComponent,
    EditshiftComponent,
    HomepageComponent,
  ],
})
export class ShiftModule {}
