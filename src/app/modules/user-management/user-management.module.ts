import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './user-management.component';
import {UserManagementRoutingModule} from './user-management-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import { CreateUserComponent } from './create-user/create-user.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    CreateUserComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserManagementRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class UserManagementModule {
}
