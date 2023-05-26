import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {UsersService} from "../../services/users/users.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../user-management/create-user/create-user.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  userData: any;
  updateDialog: any;

  constructor(public authService: AuthService, private router: Router,
              private userService: UsersService,
              public dialogRef: MatDialog) {
  }

  ngOnInit(): void {
      this.getUserTypeData();
  }
  logout() {
    this.authService.logout();
  }

  getUserTypeData(){
    this.userService.getUserById(0).subscribe((res: any) => {
      this.userData = res.payload.user;
    })
  }

  openDialoq() {
    if (this.userData){
      this.updateDialog = this.dialogRef.open(CreateUserComponent, {
        width: '600px',
        height: '300px',
        data: this.userData
      });
    }

    this.updateDialog.afterClosed().subscribe((result: any) => {
      if (result){
        this.userService.updateUser(result).subscribe((res: any) => {
          this.getUserTypeData();
        });
      }
    });
  }
}
