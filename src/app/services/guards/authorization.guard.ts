import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  private allowedUserTypes: Number[] | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    let userTypes: number = this.authService.getUserTypeForAuthorization();

    this.allowedUserTypes = route.data['allowedUserTypes'];

    if (this.allowedUserTypes && this.allowedUserTypes.indexOf(userTypes) > -1) {
      return true;
    }

    let defaultRoute = this.authService.getDefaultAuthorizedDashboardRoute(userTypes);
    this.router.navigate([defaultRoute]).then();
    return false;

  }

}
