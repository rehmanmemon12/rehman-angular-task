import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  hide: any;
  buttonName: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.buttonName = true;
      this.name = this.data.name;
      this.email = this.data.email;
    }else {
      this.name = '';
      this.email = '';
    }
  }

  createUser() {
    // Create user
    let formData = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.password_confirmation
    }

    // Handle success or show a toast message

    if (formData)
    this.dialogRef.close(formData);
  }

  UpdateUser() {
    // Update user
    let formData = {
      id: this.data.id,
      name: this.name,
      email: this.email,
    }

    // Handle success or show a toast message
    if (formData)
    this.dialogRef.close(formData);
  }

  show() {
    this.hide = false;
  }

  close() {
    this.dialogRef.close();
  }
}
