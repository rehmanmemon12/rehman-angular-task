import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthorizationGuard} from "../../services/guards/authorization.guard";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {PostsCreateComponent} from "./posts-create/posts-create.component";
import {PostsManagementComponent} from "./posts-management.component";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {
    path: '',
    component: PostsManagementComponent,
    children: [
      {path: 'list', component: PostsListComponent},
      {path: 'create', component: PostsCreateComponent},
      {path: 'edit/:id', component: PostsCreateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsManagementRoutingModule {
}
