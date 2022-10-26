import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddshiftComponent } from "./components/addshift/addshift.component";
import { EditshiftComponent } from "./components/editshift/editshift.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ShiftHomePageComponent } from "./components/shift-home-page/shift-home-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,

    children: [
      {
        path: "",
        component: LandingPageComponent,
      },
      {
        path: "my-shifts",
        component: ShiftHomePageComponent,
      },
      {
        path: "add-shift",
        component: AddshiftComponent,
      },
      {
        path: "edit-shift/:shiftId",
        component: EditshiftComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftRoutingModule {}
