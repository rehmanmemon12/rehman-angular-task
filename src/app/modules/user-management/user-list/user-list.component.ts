import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";
import {AuthService} from "../../../services/auth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export interface UserData {
  id?: number;
  name: string;
  email: string;
  actions?: any;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator = null!;
  @ViewChild(MatSort) sort: MatSort = null!;

  testing: any;
  constructor(private usersService: UsersService,
              private authService: AuthService,
              public dialogRef: MatDialog) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe((users: any) => {
      this.dataSource = new MatTableDataSource(users.payload.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error: any) => {
    });
  }

  deleteUser(data: any): void {
    // Delete user
    let id = data.id;
    this.usersService.deleteUser(id).subscribe(() => {
      // Handle success or show a toast message
      this.getUsers();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createUser(data: any) {
    // Handle create user
    this.testing = this.dialogRef.open(CreateUserComponent, {
      width: '600px',
      height: '400px',
      data: data
    });

    this.testing.afterClosed().subscribe((result: any) => {
      if (result.id) {
        this.usersService.updateUser(result).subscribe(() => {
          // Handle success or show a toast message
          this.getUsers();
        });
      } else if(!result.id) {
        this.authService.register(result).subscribe(() => {
          // Handle success or show a toast message
          this.getUsers();
        });
      }
    });
  }
}
