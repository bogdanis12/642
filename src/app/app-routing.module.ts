import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AuthGuard } from "./modules/authmodule/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "shifts", pathMatch: "full" },
  { path: "auth", redirectTo: "auth/login", pathMatch: "full" },

  {
    path: "auth",
    loadChildren: () =>
      import("./modules/authmodule/authmodule.module").then(
        (m) => m.AuthModule
      ),
  },
  {
    path: "shifts",
    loadChildren: () =>
      import("./modules/shiftmodule/shiftmodule.module").then(
        (m) => m.ShiftModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: "user",
    loadChildren: () =>
      import("./modules/usermodule/usermodule.module").then(
        (m) => m.UserModule
      ),
    canActivateChild: [AuthGuard],
  },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
