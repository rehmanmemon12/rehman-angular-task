import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import {RouterOutlet} from "@angular/router";
import {DashboardModuleRouting} from "./dashboard-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule(
  {
    declarations: [
      DashboardComponent,
    ],
    imports: [
      CommonModule,
      DashboardModuleRouting,
      MatDialogModule,
      MatButtonModule,
      MatTableModule,
      MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule
    ],
    exports: [],
    providers: [],
  }
)
export class DashboardModule {

}
