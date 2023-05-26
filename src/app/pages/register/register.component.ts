import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  hide: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,) {

  }

  ngOnInit() {

  }

  register() {

    let formData = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.password_confirmation
    }
    this.authService.register(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']).then();
      },
      error: (error) => {
        // Handle login error
      }
    });
  }

  show() {
    this.hide = !this.hide;
  }
}
