import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthorizationGuard} from "../../services/guards/authorization.guard";
import {AuthGuard} from "../../services/guards/auth.guard";
import {UserTypesObject} from "../../utils/user-types-object";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'post',
        loadChildren: () => import('../posts-management/posts-management.module').then(m => m.PostsManagementModule)
      },
      {
        path: 'users',
        data: {
          allowedUserTypes: [
            UserTypesObject.ADMIN,
          ]
        },
        canActivate: [AuthGuard, AuthorizationGuard],
        loadChildren: () => import('../user-management/user-management.module').then(m => m.UserManagementModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRouting {
}
