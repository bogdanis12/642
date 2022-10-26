import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { UserHomeComponent } from "./components/user-home/user-home.component";

const routes: Routes = [
  {
    path: "",
    component: UserHomeComponent,
    children: [
      {
        path: "edit-profile/:userId",
        component: EditprofileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermoduleRoutingModule {}
