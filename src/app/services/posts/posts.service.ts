import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = environment.ApiUrl; // Replace with your API URL

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/posts/`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/posts`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/posts/${id}`);
  }

  updatePost(post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/posts`, post);
  }

}
