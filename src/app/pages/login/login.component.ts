import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.authService.user.value) {
      this.router.navigate(['/dashboard']).then();
    }
  }

  login(): void {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response) => {
          // Handle login success
          let token = response.payload.authToken;
          this.authService.handleAuthentication(token);
          this.router.navigate(['/dashboard']).then();
        },
        error: (error) => {
          // Handle login error
        },
        complete: () => {
          // Handle login completion
          // Redirect to the home page or the desired route
        }
      });
  }

  register() {
    this.router.navigate(['/register']).then();
  }
}
