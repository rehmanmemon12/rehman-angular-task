import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostsService} from "../../../services/posts/posts.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {PostsCreateComponent} from "../posts-create/posts-create.component";

interface PostData {
  id?: number;
  title: string;
  content: string;
  userId?: number;
}

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy{
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];
  dataSource: MatTableDataSource<PostData> = new MatTableDataSource<PostData>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator = null!;
  @ViewChild(MatSort) sort: MatSort = null!;

  testing: any;
  constructor(private postsService: PostsService,
              public dialogRef: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllpost();
  }
  getAllpost(): void {
    this.postsService.getPosts().subscribe((result: any) => {
      let posts = result.payload.posts;
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error: any) => {
    });
  }

  deletePost(data: any): void {
    // Delete user
    let id = data.id;
    this.postsService.deletePost(id).subscribe(() => {
      // Handle success or show a toast message
      this.getAllpost();
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
  createPost(data: any) {
    this.testing = this.dialogRef.open(PostsCreateComponent, {
      width: '600px',
      height: '400px',
      data: data
    });

    this.testing.afterClosed().subscribe((result: any) => {
      if (result.id) {
        this.postsService.updatePost(result).subscribe(() => {
          // Handle success or show a toast message
          this.getAllpost();
        });
      } else if(!result.id) {
        this.postsService.createPost(result).subscribe(() => {
          // Handle success or show a toast message
          this.getAllpost();
        });
      }
    });
  }
}
