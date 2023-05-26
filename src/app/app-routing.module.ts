import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AuthorizationGuard} from "./services/guards/authorization.guard";
import {AuthGuard} from "./services/guards/auth.guard";
import {AppComponent} from "./app.component";
import {UserTypesObject} from "./utils/user-types-object";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'dashboard',
        data: {
          allowedUserTypes: [
            UserTypesObject.ADMIN,
            UserTypesObject.USER,
          ]
        },
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard, AuthorizationGuard],
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
