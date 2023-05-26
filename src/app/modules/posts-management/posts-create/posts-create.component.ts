import {Component, Inject} from '@angular/core';
import {PostsService} from "../../../services/posts/posts.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss']
})
export class PostsCreateComponent {


  title: string = '';
  content: string = '';
  hide: any;
  buttonName: boolean = false;

  constructor(public dialogRef: MatDialogRef<PostsCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.buttonName = true;
      this.title = this.data.title;
      this.content = this.data.content;
    }else {
      this.title = '';
      this.content = '';
    }
  }

  createPost() {
    // Create user
    let formData = {
      title: this.title,
      content: this.content,
    }
    // Handle success or show a toast message

    if (formData)
      this.dialogRef.close(formData);
  }

  UpdatePost() {
    // Update user
    let formData = {
      id: this.data.id,
      title: this.title,
      content: this.content,
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
