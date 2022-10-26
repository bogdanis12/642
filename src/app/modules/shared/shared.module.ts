import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { NavbarComponent } from "src/app/modules/shared/components/navbar/navbar.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  exports: [NavbarComponent, FooterComponent],
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
