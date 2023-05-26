import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserModel} from "../../Model/user.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {UserTypesObject} from "../../utils/user-types-object";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.ApiUrl; // Replace with your API URL
  public user: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private jwtHelper: JwtHelperService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {email, password});
  }


  handleAuthentication(idToken: any): void {
    const expirationIn = this.getExpireInTime(idToken);
    const user = new UserModel(idToken);
    this.user.next(user);
    this.autoLogout(expirationIn);
    localStorage.setItem('token', JSON.stringify(idToken));
  }

  private getExpireInTime(idToken: string): number {
    let token = this.jwtHelper.decodeToken(idToken);
    let expirationDate = new Date(token.exp * 1000);
    return expirationDate.getTime() - (new Date().getTime());
  }

  setToken(token: any): void {
    localStorage.setItem('token', token.authToken);
  }

  get getAuthToken(): string | null {
    if (!localStorage.getItem('token')) {
      return null;
    }
    let token = localStorage.getItem('token');
    return JSON.parse(token ?? '');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, formData);
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']).then();
    localStorage.removeItem('token');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public getUserTypeForAuthorization(): number {
    const userData: string = JSON.parse(localStorage.getItem('token') ?? '');

    if (!userData) {
      return 0;
    }
    const token = this.jwtHelper.decodeToken(userData);

    return token.userRole ?? 0;
  }

  get checkIfUserIsAuthenticated(): boolean {
    if (!localStorage.getItem('_metaData')) {
      return false;
    }
    const userData: {
      idToken: string;
    } = JSON.parse(localStorage.getItem('_metaData') ?? '');
    if (!userData) {
      return false;
    } else {
      return true
    }
  }

  public getDefaultAuthorizedDashboardRoute(userType?: number): string {
    let defaultRoute = '';

    switch (userType) {
      case UserTypesObject.ADMIN:
        defaultRoute = '/admin/dashboard';
        break;
      case UserTypesObject.USER:
        defaultRoute = '/user/dashboard';
        break;
      default:
        defaultRoute = '/login';
        break;
    }
    return defaultRoute;
  }

  public autoLogin() {
    if (!localStorage.getItem('token')) {
      return;
    }
    const userData = JSON.parse(localStorage.getItem('token') ?? '');
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(userData);
    const expirationDuration = this.getExpireInTime(userData);

    if (loadedUser.getToken(expirationDuration)) {
      this.user.next(loadedUser);
      this.autoLogout(expirationDuration);
    }
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/users`);
  }

}
