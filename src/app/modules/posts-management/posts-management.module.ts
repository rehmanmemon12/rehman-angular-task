import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsManagementComponent} from './posts-management.component';
import {PostsManagementRoutingModule} from './posts-management-routing.module';
import {PostsListComponent} from './posts-list/posts-list.component';
import {PostsCreateComponent} from './posts-create/posts-create.component';
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    PostsManagementComponent,
    PostsListComponent,
    PostsCreateComponent
  ],
  imports: [
    CommonModule,
    PostsManagementRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}

  ]

})
export class PostsManagementModule {
}
